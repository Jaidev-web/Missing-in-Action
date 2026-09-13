import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

import '../services/firestore_service.dart';
import '../services/auth_service.dart';
import '../theme/app_colors.dart';
import '../widgets/toggle_switch.dart';
import '../services/firestore_service.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

/// Toxicity sensitivity levels for the "Protection Shield" section.
///
/// Replaces the `'Gentle' | 'Standard' | 'Strict'` string union from
/// `SettingsScreen.tsx` with a proper enum.


/// The Settings tab: profile card, protection controls, guardian linking,
/// and privacy/data-rights section.
///
/// `SettingsScreen.tsx` owns six independent `useState` values
/// (`realTimeShield`, `autoBlur`, `bedtimeMode`, `panicGesture`,

/// becomes a [StatefulWidget] whose fields map directly to those hooks,
/// updated through [setState] exactly where the React version calls its
/// setters.
class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  final FirestoreService _firestoreService = FirestoreService();
  bool _showTrustPromiseInfo = false;

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<DocumentSnapshot<Map<String, dynamic>>>(
      stream: _firestoreService.streamUserSettings(),
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return const Center(child: Text("Error loading settings"));
        }
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        final data = snapshot.data?.data() ?? {};
        final String _name = data['name'] ?? 'Alex M.';
        
        // Support legacy 'grade' field but default to a numeric age
        String rawAge = (data['age'] ?? data['grade'] ?? '14').toString();
        // Extract just the numbers so if they typed 'Gr. 9' before, it becomes '9'
        rawAge = rawAge.replaceAll(RegExp(r'[^0-9]'), '');
        if (rawAge.isEmpty) rawAge = '14';
        
        final String _displayAge = 'Age $rawAge';

        final bool _realTimeShield = data['realTimeShield'] ?? true;
        final bool _autoBlur = data['autoBlur'] ?? true;
        final bool _bedtimeMode = data['bedtimeMode'] ?? true;
        final bool _panicGesture = data['panicGesture'] ?? true;
        final String _panicGestureType = data['panicGestureType'] ?? 'Triple-click the power button';
        final List<String> _guardians = List<String>.from(data['guardians'] ?? []);

        void _editProfile() {
          final nameController = TextEditingController(text: _name);
          final ageController = TextEditingController(text: rawAge);
          showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: const Text('Edit Profile'),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TextField(
                    controller: nameController,
                    decoration: const InputDecoration(labelText: 'Name'),
                  ),
                  TextField(
                    controller: ageController,
                    decoration: const InputDecoration(labelText: 'Age'),
                    keyboardType: TextInputType.number,
                  ),
                ],
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('Cancel'),
                ),
                TextButton(
                  onPressed: () {
                    _firestoreService.updateSetting('name', nameController.text.trim());
                    // Clear out old grade field and save new age
                    _firestoreService.updateSetting('grade', null);
                    _firestoreService.updateSetting('age', ageController.text.trim());
                    Navigator.pop(context);
                  },
                  child: const Text('Save'),
                ),
              ],
            ),
          );
        }

        void _editPanicGesture() {
          showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: const Text('Select Panic Gesture'),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  ListTile(
                    title: const Text('Triple-click the power button'),
                    onTap: () {
                      _firestoreService.updateSetting('panicGestureType', 'Triple-click the power button');
                      Navigator.pop(context);
                    },
                  ),
                  ListTile(
                    title: const Text('Shake device vigorously'),
                    onTap: () {
                      _firestoreService.updateSetting('panicGestureType', 'Shake device vigorously');
                      Navigator.pop(context);
                    },
                  ),
                  ListTile(
                    title: const Text('Tap back of phone 5 times'),
                    onTap: () {
                      _firestoreService.updateSetting('panicGestureType', 'Tap back of phone 5 times');
                      Navigator.pop(context);
                    },
                  ),
                ],
              ),
            ),
          );
        }

        Future<void> _testPanicGesture() async {
          // 1. Check permissions
          LocationPermission permission = await Geolocator.checkPermission();
          if (permission == LocationPermission.denied) {
            permission = await Geolocator.requestPermission();
            if (permission == LocationPermission.denied) {
              if (!mounted) return;
              ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Location permissions denied')));
              return;
            }
          }
          
          // 2. Get location
          if (!mounted) return;
          ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Capturing GPS location...')));
              
          try {
            Position position = await Geolocator.getCurrentPosition(
                desiredAccuracy: LocationAccuracy.high);
                
            // 3. Save to firebase
            await _firestoreService.saveSosLocation(position.latitude, position.longitude);
            
            if (!mounted) return;
            ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('SOS Alert sent with live GPS!')));
          } catch (e) {
            if (!mounted) return;
            ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Failed to get location: $e')));
          }
        }

        return SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _ProfileCard(
                name: _name,
                ageDisplay: _displayAge,
                onEdit: _editProfile,
              ),
              const SizedBox(height: 32),
              _SectionHeader(
                icon: Icons.shield_rounded,
                iconColor: AppColors.primary,
                title: 'Protection Shield Controls',
              ),
              const SizedBox(height: 16),
              _ShieldControls(
                realTimeShield: _realTimeShield,
                onRealTimeShieldChanged: (v) => _firestoreService.updateSetting('realTimeShield', v),
                autoBlur: _autoBlur,
                onAutoBlurChanged: (v) => _firestoreService.updateSetting('autoBlur', v),
                bedtimeMode: _bedtimeMode,
                onBedtimeModeChanged: (v) => _firestoreService.updateSetting('bedtimeMode', v),
              ),
              const SizedBox(height: 32),
              _SectionHeader(
                icon: Icons.groups_rounded,
                iconColor: AppColors.secondary,
                title: 'Guardian Link & Trust',
              ),
              const SizedBox(height: 16),
              _GuardianLinkCard(
                guardians: _guardians,
                showTrustPromiseInfo: _showTrustPromiseInfo,
                onToggleTrustPromiseInfo: () => setState(
                  () => _showTrustPromiseInfo = !_showTrustPromiseInfo,
                ),
                onAddGuardian: (name) => _firestoreService.addGuardian(name),
                onRemoveGuardian: (name) => _firestoreService.removeGuardian(name),
              ),
              const SizedBox(height: 32),
              _SectionHeader(
                icon: Icons.lock_rounded,
                iconColor: AppColors.primary,
                title: 'Privacy & Data Rights',
              ),
              const SizedBox(height: 16),
              _PanicGestureCard(
                panicGesture: _panicGesture,
                panicGestureType: _panicGestureType,
                onChanged: (v) => _firestoreService.updateSetting('panicGesture', v),
                onEdit: _editPanicGesture,
                onTest: _testPanicGesture,
              ),
              const SizedBox(height: 32),
              ElevatedButton.icon(
                onPressed: () => AuthService().signOut(),
                icon: const Icon(Icons.logout_rounded, color: AppColors.alert),
                label: const Text(
                  'Log Out',
                  style: TextStyle(
                    color: AppColors.alert,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.alertBg,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  elevation: 0,
                ),
              ),
              const SizedBox(height: 24),
              const _SettingsFooter(),
            ],
          ),
        );
      },
    );
  }
}

class _SectionHeader extends StatelessWidget {
  const _SectionHeader({
    required this.icon,
    required this.iconColor,
    required this.title,
  });

  final IconData icon;
  final Color iconColor;
  final String title;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4),
      child: Row(
        children: [
          Icon(icon, size: 20, color: iconColor),
          const SizedBox(width: 8),
          Text(
            title,
            style: const TextStyle(
              fontSize: 17,
              fontWeight: FontWeight.bold,
              color: AppColors.text,
            ),
          ),
        ],
      ),
    );
  }
}

class _CardShell extends StatelessWidget {
  const _CardShell({required this.child, this.padding});

  final Widget child;
  final EdgeInsetsGeometry? padding;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: padding ?? const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.border.withOpacity(0.3)),
        boxShadow: AppColors.ambient1,
      ),
      child: child,
    );
  }
}

class _ProfileCard extends StatelessWidget {
  const _ProfileCard({
    required this.name,
    required this.ageDisplay,
    required this.onEdit,
  });

  final String name;
  final String ageDisplay;
  final VoidCallback onEdit;

  String get initials {
    if (name.isEmpty) return '?';
    final parts = name.split(' ');
    if (parts.length > 1) {
      return '${parts[0][0]}${parts[1][0]}'.toUpperCase();
    }
    return name.substring(0, name.length >= 2 ? 2 : 1).toUpperCase();
  }

  @override
  Widget build(BuildContext context) {
    return _CardShell(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Row(
                  children: [
                    Stack(
                      clipBehavior: Clip.none,
                      children: [
                        Container(
                          width: 64,
                          height: 64,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            color: AppColors.primaryTint,
                            shape: BoxShape.circle,
                            border:
                                Border.all(color: AppColors.surface, width: 2),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.05),
                                blurRadius: 2,
                              ),
                            ],
                          ),
                          child: Text(
                            initials,
                            style: const TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              letterSpacing: -0.5,
                              color: AppColors.primary,
                            ),
                          ),
                        ),
                        Positioned(
                          bottom: -2,
                          right: -2,
                          child: Container(
                            padding: const EdgeInsets.all(2),
                            decoration: BoxDecoration(
                              color: AppColors.surface,
                              shape: BoxShape.circle,
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withOpacity(0.08),
                                  blurRadius: 2,
                                ),
                              ],
                            ),
                            child: const Icon(
                              Icons.check_circle_rounded,
                              size: 18,
                              color: AppColors.secondary,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Flexible(
                                child: Text(
                                  name,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                    color: AppColors.text,
                                  ),
                                ),
                              ),
                              const SizedBox(width: 8),
                              Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 8,
                                  vertical: 2,
                                ),
                                decoration: BoxDecoration(
                                  color: AppColors.primaryTint,
                                  borderRadius: BorderRadius.circular(999),
                                ),
                                child: Text(
                                  ageDisplay,
                                  style: const TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                    color: AppColors.primary,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 2),
                          const Text(
                            'Shield: Balanced Guardian',
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w500,
                              color: AppColors.textSubtle,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              IconButton(
                icon: const Icon(Icons.edit_rounded, color: AppColors.primary),
                onPressed: onEdit,
                style: IconButton.styleFrom(
                  backgroundColor: AppColors.primaryTint,
                ),
              ),
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: AppColors.primaryTint,
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.shield_rounded,
                  size: 20,
                  color: AppColors.primary,
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppColors.secondaryTint,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Row(
              children: [
                const Icon(
                  Icons.smartphone_rounded,
                  size: 18,
                  color: AppColors.secondary,
                ),
                const SizedBox(width: 12),
                const Expanded(
                  child: Text(
                    'Background Shield ',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF033B26),
                    ),
                  ),
                ),
                const Text(
                  'ACTIVE',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 0.4,
                    color: AppColors.secondary,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ShieldControls extends StatelessWidget {
  const _ShieldControls({
    required this.realTimeShield,
    required this.onRealTimeShieldChanged,
    required this.autoBlur,
    required this.onAutoBlurChanged,
    required this.bedtimeMode,
    required this.onBedtimeModeChanged,    
  });

  final bool realTimeShield;
  final ValueChanged<bool> onRealTimeShieldChanged;
  final bool autoBlur;
  final ValueChanged<bool> onAutoBlurChanged;
  final bool bedtimeMode;
  final ValueChanged<bool> onBedtimeModeChanged;


  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _ToggleRow(
            title: 'Real-Time Screen Shield',
            description:
                'Scans visible content live for bullying or intimidation.',
            value: realTimeShield,
            onChanged: onRealTimeShieldChanged,
          ),
          
          const SizedBox(height: 24),
          _ToggleRow(
            title: 'Quiet Bedtime Mode 🌙',
            description:
                'Silences disturbing content pings from 9:30 PM to 7:00 AM.',
            value: bedtimeMode,
            onChanged: onBedtimeModeChanged,
          ),
        ],
      ),
    );
  }
}

class _ToggleRow extends StatelessWidget {
  const _ToggleRow({
    required this.title,
    required this.description,
    required this.value,
    required this.onChanged,
  });

  final String title;
  final String description;
  final bool value;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: AppColors.text,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                description,
                style: const TextStyle(
                  fontSize: 13,
                  height: 1.3,
                  color: AppColors.textSubtle,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(width: 16),
        ToggleSwitch(checked: value, onChanged: onChanged),
      ],
    );
  }
}



class _GuardianLinkCard extends StatelessWidget {
  const _GuardianLinkCard({
    required this.guardians,
    required this.showTrustPromiseInfo,
    required this.onToggleTrustPromiseInfo,
    required this.onAddGuardian,
    required this.onRemoveGuardian,
  });

  final List<String> guardians;
  final bool showTrustPromiseInfo;
  final VoidCallback onToggleTrustPromiseInfo;
  final ValueChanged<String> onAddGuardian;
  final ValueChanged<String> onRemoveGuardian;

  void _openQRScanner(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) {
        return Container(
          height: MediaQuery.of(context).size.height * 0.7,
          decoration: const BoxDecoration(
            color: AppColors.canvas,
            borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
          ),
          child: Column(
            children: [
              const SizedBox(height: 16),
              Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: AppColors.textSubtle.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(height: 24),
              const Text(
                'Scan Guardian QR',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: AppColors.text,
                ),
              ),
              const SizedBox(height: 24),
              Expanded(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: MobileScanner(
                    onDetect: (capture) {
                      final List<Barcode> barcodes = capture.barcodes;
                      if (barcodes.isNotEmpty && barcodes.first.rawValue != null) {
                        final String code = barcodes.first.rawValue!;
                        // Close the bottom sheet
                        Navigator.of(context).pop();
                        // Call the callback (for demo we just use the raw value or a placeholder)
                        // Typically, the QR might contain a specific ID, but here we just add the scanned name.
                        onAddGuardian(code.length > 20 ? 'Linked Guardian' : code);
                        
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Guardian Linked Successfully!')),
                        );
                      }
                    },
                  ),
                ),
              ),
              const SizedBox(height: 32),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return _CardShell(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          ...guardians.map((g) => Column(
                children: [
                  _GuardianRow(
                    name: g,
                    onRemove: () => onRemoveGuardian(g),
                  ),
                  const SizedBox(height: 16),
                ],
              )),
          OutlinedButton.icon(
            onPressed: () => _openQRScanner(context),
            style: OutlinedButton.styleFrom(
              foregroundColor: AppColors.primary,
              side: BorderSide(
                color: AppColors.border.withOpacity(0.6),
                width: 2,
                style: BorderStyle.solid,
              ),
              padding: const EdgeInsets.symmetric(vertical: 12),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            icon: const Icon(Icons.qr_code_rounded, size: 18),
            label: const Text(
              'Add Guardian via QR Scan',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
            ),
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.canvas,
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Expanded(
                      child: Row(
                        children: [
                          Icon(Icons.shield_rounded,
                              size: 14, color: AppColors.primary),
                          SizedBox(width: 8),
                          Flexible(
                            child: Text(
                              'Our Mutual Trust Promise',
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.bold,
                                color: AppColors.text,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    InkWell(
                      onTap: onToggleTrustPromiseInfo,
                      borderRadius: BorderRadius.circular(999),
                      child: Container(
                        padding: const EdgeInsets.all(6),
                        decoration: BoxDecoration(
                          color: showTrustPromiseInfo
                              ? AppColors.primaryTint
                              : Colors.transparent,
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          Icons.info_rounded,
                          size: 14,
                          color: showTrustPromiseInfo
                              ? AppColors.primary
                              : AppColors.textSubtle,
                        ),
                      ),
                    ),
                  ],
                ),
                AnimatedSize(
                  duration: const Duration(milliseconds: 200),
                  curve: Curves.easeInOut,
                  child: showTrustPromiseInfo
                      ? const Padding(
                          padding: EdgeInsets.only(top: 8),
                          child: Text.rich(
                            TextSpan(
                              style: TextStyle(
                                fontSize: 12,
                                height: 1.5,
                                color: AppColors.textSubtle,
                              ),
                              children: [
                                TextSpan(
                                  text: 'Parents only receive proactive '
                                      'guidance prompts during ',
                                ),
                                TextSpan(
                                  text: 'severe threats or repeated '
                                      'harassment',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: AppColors.text,
                                  ),
                                ),
                                TextSpan(
                                  text: '. SafeNET never shares your '
                                      'private diary, casual jokes, or '
                                      'photo roll.',
                                ),
                              ],
                            ),
                          ),
                        )
                      : const SizedBox(width: double.infinity, height: 0),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _GuardianRow extends StatelessWidget {
  const _GuardianRow({
    required this.name,
    required this.onRemove,
  });

  final String name;
  final VoidCallback onRemove;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: AppColors.primaryTint,
            shape: BoxShape.circle,
          ),
          child: const Icon(
            Icons.manage_accounts_rounded,
            size: 20,
            color: AppColors.primary,
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Flexible(
                    child: Text(
                      name,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: AppColors.text,
                      ),
                    ),
                  ),
                  const SizedBox(width: 6),
                  Container(
                    width: 8,
                    height: 8,
                    decoration: const BoxDecoration(
                      color: AppColors.secondary,
                      shape: BoxShape.circle,
                    ),
                  ),
                ],
              ),
              const Text(
                'Linked & Verified',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: AppColors.secondary,
                ),
              ),
            ],
          ),
        ),
        TextButton(
          onPressed: () {
            showModalBottomSheet(
              context: context,
              builder: (context) => SafeArea(
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      ListTile(
                        leading: const Icon(Icons.delete_rounded, color: AppColors.alert),
                        title: const Text('Remove Guardian', style: TextStyle(color: AppColors.alert)),
                        onTap: () {
                          Navigator.pop(context);
                          onRemove();
                        },
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
          style: TextButton.styleFrom(
            backgroundColor: AppColors.surfaceTint,
            foregroundColor: AppColors.primary,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(999),
            ),
          ),
          child: const Text(
            'Edit',
            style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
          ),
        ),
      ],
    );
  }
}

class _PanicGestureCard extends StatelessWidget {
  const _PanicGestureCard({
    required this.panicGesture,
    required this.panicGestureType,
    required this.onChanged,
    required this.onEdit,
    required this.onTest,
  });

  final bool panicGesture;
  final String panicGestureType;
  final ValueChanged<bool> onChanged;
  final VoidCallback onEdit;
  final VoidCallback onTest;

  @override
  Widget build(BuildContext context) {
    return _CardShell(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      margin: const EdgeInsets.only(top: 4),
                      decoration: BoxDecoration(
                        color: AppColors.primaryTint,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.shield_rounded,
                        size: 20,
                        color: AppColors.primary,
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Discreet Panic Gesture',
                            style: TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.bold,
                              color: AppColors.text,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            '$panicGestureType to instantly '
                            'activate a calm, blank decoy screen and ping '
                            'your guardian with live GPS.',
                            style: const TextStyle(
                              fontSize: 12,
                              height: 1.5,
                              color: AppColors.textSubtle,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Column(
                children: [
                  TextButton(
                    onPressed: onEdit,
                    style: TextButton.styleFrom(
                      backgroundColor: AppColors.surfaceTint,
                      foregroundColor: AppColors.primary,
                      padding:
                          const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(999),
                      ),
                    ),
                    child: const Text(
                      'Edit',
                      style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                    ),
                  ),
                  const SizedBox(height: 8),
                  TextButton(
                    onPressed: onTest,
                    style: TextButton.styleFrom(
                      backgroundColor: AppColors.alertBg,
                      foregroundColor: AppColors.alert,
                      padding:
                          const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(999),
                      ),
                    ),
                    child: const Text(
                      'Simulate',
                      style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.only(top: 16),
            decoration: BoxDecoration(
              border: Border(
                top: BorderSide(color: AppColors.border.withOpacity(0.5)),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Emergency Gesture',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.bold,
                    color: AppColors.text,
                  ),
                ),
                Row(
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(right: 12),
                      child: Text(
                        panicGesture ? 'ENABLED' : 'DISABLED',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 0.4,
                          color: panicGesture ? AppColors.secondary : AppColors.textSubtle,
                        ),
                      ),
                    ),
                    ToggleSwitch(checked: panicGesture, onChanged: onChanged),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _SettingsFooter extends StatelessWidget {
  const _SettingsFooter();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.shield_rounded, size: 12, color: AppColors.textSubtle),
            SizedBox(width: 6),
            Flexible(
              child: Text(
                'SafeNET v2.4 (Android Security Compliant)',
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textSubtle,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 4),
        Text(
          'Zero Cloud Mirroring • Child Digital Rights Framework 2025',
          style: TextStyle(
            fontSize: 10,
            color: AppColors.textSubtle.withOpacity(0.7),
          ),
        ),
      ],
    );
  }
}


