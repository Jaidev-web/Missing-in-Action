import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

import '../theme/app_colors.dart';
import '../services/firestore_service.dart';

/// The Home tab: greeting, protection status, two info cards, the
/// "talk to a counselor" CTA, and a privacy footer.
///
/// `HomeScreen.tsx` uses no hooks — it's pure presentation — so this stays a
/// [StatelessWidget], matching constraint #2 (only reach for a
/// [StatefulWidget] when there's actual state to manage).
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<DocumentSnapshot<Map<String, dynamic>>>(
      stream: FirestoreService().streamUserSettings(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        final data = snapshot.data?.data() ?? {};
        final bool isShieldActive = data['realTimeShield'] ?? true;
        final List guardians = data['guardians'] ?? [];
        final bool isLinked = guardians.isNotEmpty;
        final String name = data['name'] ?? 'Alex';
        final String? profilePicUrl = data['profilePicUrl'];

        return SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _Greeting(name: name, profilePicUrl: profilePicUrl),
              const SizedBox(height: 16),
              const _StatusGlow(),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: _InfoCard(
                      icon: isShieldActive ? Icons.visibility_off_rounded : Icons.visibility_rounded,
                      badgeIcon: isShieldActive ? Icons.check_rounded : Icons.warning_rounded,
                      badgeLabel: isShieldActive ? 'Active' : 'Paused',
                      badgeColor: isShieldActive ? AppColors.secondary : AppColors.alert,
                      badgeBg: isShieldActive ? AppColors.secondaryTint : AppColors.alertBg,
                      title: 'Screen Shield',
                      description: isShieldActive 
                          ? 'Detecting toxic text across apps automatically.'
                          : 'Real-time protection is currently paused.',
                      footerLabel: isShieldActive ? 'Quiet Mode On' : 'Quiet Mode Off',
                      footerColor: isShieldActive ? AppColors.secondary : AppColors.alert,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: _InfoCard(
                      icon: isLinked ? Icons.favorite_rounded : Icons.link_off_rounded,
                      badgeIcon: isLinked ? Icons.link_rounded : Icons.warning_rounded,
                      badgeLabel: isLinked ? 'Linked' : 'None',
                      badgeColor: isLinked ? AppColors.primary : AppColors.alert,
                      badgeBg: isLinked ? AppColors.primaryTint : AppColors.alertBg,
                      title: 'Parent Link',
                      description: isLinked
                          ? 'Trusted guardian verified & ready if requested.'
                          : 'No guardians linked yet.',
                      footerLabel: isLinked ? 'Heartbeat Normal' : 'Action Needed',
                      footerColor: isLinked ? AppColors.primary : AppColors.alert,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              const _CounselorCard(),
              const SizedBox(height: 8),
              const _PrivacyFooter(),
            ],
          ),
        );
      },
    );
  }
}


class _Greeting extends StatelessWidget {
  final String name;
  final String? profilePicUrl;

  const _Greeting({required this.name, this.profilePicUrl});

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
                "Hi $name, you're safe here ",
                style: const TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: AppColors.text,
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                'Your phone is quiet and protected today.',
                style: TextStyle(
                  fontSize: 14,
                  color: AppColors.textSubtle,
                ),
              ),
            ],
          ),
        ),
        Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            color: AppColors.primaryTint.withOpacity(0.6),
            shape: BoxShape.circle,
            image: profilePicUrl != null && profilePicUrl!.isNotEmpty
                ? DecorationImage(
                    image: NetworkImage(profilePicUrl!),
                    fit: BoxFit.cover,
                  )
                : null,
          ),
          child: profilePicUrl != null && profilePicUrl!.isNotEmpty
              ? null
              : const Icon(Icons.air_rounded, color: AppColors.primary),
        ),
      ],
    );
  }
}

class _StatusGlow extends StatelessWidget {
  const _StatusGlow();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 24),
        child: Stack(
          alignment: Alignment.center,
          children: [
            // Two faint concentric rings, matching the two absolutely
            // positioned bordered circles in the source.
            Container(
              width: 246,
              height: 246,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: AppColors.primaryTint.withOpacity(0.1),
                ),
              ),
            ),
            Container(
              width: 235,
              height: 235,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: AppColors.primaryTint.withOpacity(0.4),
                ),
              ),
            ),
            Container(
              width: 224,
              height: 224,
              padding: const EdgeInsets.symmetric(horizontal: 24),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    AppColors.primaryTint.withOpacity(0.3),
                    AppColors.canvas,
                  ],
                ),
              ),
              child: FittedBox(
                fit: BoxFit.scaleDown,
                child: SizedBox(
                  width: 176,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                    width: 64,
                    height: 64,
                    margin: const EdgeInsets.only(bottom: 16),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [
                          AppColors.secondaryTint.withOpacity(0.4),
                          AppColors.surface,
                        ],
                      ),
                      boxShadow: AppColors.ambient1,
                    ),
                    child: Center(
                      child: Container(
                        width: 48,
                        height: 48,
                        decoration: const BoxDecoration(
                          color: AppColors.secondary,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.gpp_good_rounded,
                          color: Colors.white,
                          size: 24,
                        ),
                      ),
                    ),
                  ),
                  const Text(
                    'Protection Active',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: AppColors.text,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: AppColors.secondaryTint,
                      borderRadius: BorderRadius.circular(999),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          width: 6,
                          height: 6,
                          margin: const EdgeInsets.only(right: 6),
                          decoration: const BoxDecoration(
                            color: AppColors.secondary,
                            shape: BoxShape.circle,
                          ),
                        ),
                        const Text(
                          'Real-time safe guard',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: AppColors.secondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'All social channels and messages remain peaceful',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 12,
                      height: 1.4,
                      color: AppColors.textSubtle,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _InfoCard extends StatelessWidget {
  const _InfoCard({
    required this.icon,
    required this.badgeIcon,
    required this.badgeLabel,
    required this.badgeColor,
    required this.badgeBg,
    required this.title,
    required this.description,
    required this.footerLabel,
    required this.footerColor,
  });

  final IconData icon;
  final IconData badgeIcon;
  final String badgeLabel;
  final Color badgeColor;
  final Color badgeBg;
  final String title;
  final String description;
  final String footerLabel;
  final Color footerColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.border.withOpacity(0.3)),
        boxShadow: AppColors.ambient1,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: AppColors.primaryTint.withOpacity(0.6),
                  shape: BoxShape.circle,
                ),
                child: Icon(icon, size: 18, color: AppColors.primary),
              ),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: badgeBg,
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(badgeIcon, size: 10, color: badgeColor),
                    const SizedBox(width: 4),
                    Text(
                      badgeLabel,
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                        color: badgeColor,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              color: AppColors.text,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            description,
            style: const TextStyle(
              fontSize: 11,
              height: 1.5,
              color: AppColors.textSubtle,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 6,
                height: 6,
                margin: const EdgeInsets.only(right: 6),
                decoration: BoxDecoration(
                  color: footerColor,
                  shape: BoxShape.circle,
                ),
              ),
              Flexible(
                child: Text(
                  footerLabel,
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    color: footerColor,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _CounselorCard extends StatelessWidget {
  const _CounselorCard();

  Future<void> _startChat() async {
    // Placeholder deep link — wire this up to the real chat flow /
    // in-app route once the counselor chat feature exists.
    final uri = Uri.parse('https://safenet.app/chat');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  Future<void> _triggerEmergencySos() async {
    // Dials the 988 Suicide & Crisis Lifeline as the emergency action.
    final uri = Uri(scheme: 'tel', path: '988');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }

  Future<void> _quickSafeExit() async {
    // "Quick exit" is a common pattern in safety apps: immediately replace
    // what's on screen with a neutral page. Launching a plain external site
    // (rather than an in-app route) is deliberate — it leaves this app's
    // task entirely, which is the point of the feature.
    final uri = Uri.parse('https://www.google.com');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      clipBehavior: Clip.antiAlias,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: AppColors.primary,
        borderRadius: BorderRadius.circular(32),
        boxShadow: AppColors.ambient2,
      ),
      child: Stack(
        children: [
          // Decorative corner circle, matching the absolutely positioned
          // `bg-white/5` blob in the source.
          Positioned(
            top: -32,
            right: -32,
            child: Container(
              width: 128,
              height: 128,
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.05),
                shape: BoxShape.circle,
              ),
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(999),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          width: 6,
                          height: 6,
                          margin: const EdgeInsets.only(right: 6),
                          decoration: const BoxDecoration(
                            color: AppColors.secondaryLight,
                            shape: BoxShape.circle,
                          ),
                        ),
                        const Text(
                          'Safe Haven Available Now',
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.1),
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(
                      Icons.headset_rounded,
                      size: 20,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              const Padding(
                padding: EdgeInsets.only(right: 16),
                child: Text(
                  'Need someone to talk to?',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Confidential • Free • Available 24/7 • One tap away',
                style: TextStyle(
                  fontSize: 13,
                  height: 1.4,
                  color: AppColors.primaryTint,
                ),
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: _startChat,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: AppColors.primary,
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(999),
                    ),
                    elevation: 0,
                  ),
                  icon: const Icon(Icons.chat_bubble_rounded, size: 18),
                  label: const Text(
                    'Talk to a Counselor',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _GhostButton extends StatelessWidget {
  const _GhostButton({
    required this.icon,
    required this.label,
    required this.onTap,
  });

  final IconData icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white.withOpacity(0.1),
      borderRadius: BorderRadius.circular(999),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(999),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 14, color: Colors.white),
              const SizedBox(width: 6),
              Flexible(
                child: Text(
                  label,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _PrivacyFooter extends StatelessWidget {
  const _PrivacyFooter();

  Future<void> _openPrivacyInfo() async {
    final uri = Uri.parse('https://safenet.app/privacy');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
      child: Column(
        children: [
          Container(
            width: 32,
            height: 32,
            margin: const EdgeInsets.only(bottom: 12),
            decoration: BoxDecoration(
              color: AppColors.primaryTint.withOpacity(0.3),
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.lock_rounded,
              size: 14,
              color: AppColors.textSubtle,
            ),
          ),
          ConstrainedBox(
            constraints: BoxConstraints(maxWidth: 280),
            child: Text(
              'Your chats are encrypted and stay on your phone. Only '
              'danger is reported.',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 12,
                height: 1.5,
                color: AppColors.textSubtle,
              ),
            ),
          ),
          const SizedBox(height: 8),
          TextButton(
            onPressed: _openPrivacyInfo,
            style: TextButton.styleFrom(
              foregroundColor: AppColors.primary,
              padding: EdgeInsets.zero,
              minimumSize: const Size(0, 0),
              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
            ),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Flexible(
                  child: Text(
                    'Learn how your privacy is guarded',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                SizedBox(width: 4),
                Icon(Icons.arrow_forward_rounded, size: 12),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
