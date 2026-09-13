import 'dart:async';

import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../models/faq_item.dart';
import '../theme/app_colors.dart';
import '../widgets/faq_accordion_item.dart';

/// The four phases of the box-breathing exercise, in cycle order.
///
/// Ported from the `'Inhale' | 'Hold' | 'Exhale' | 'Rest'` string union in
/// `HelplineScreen.tsx`.
enum BreathingPhase {
  inhale('Inhale', Duration(seconds: 4), '4s'),
  hold('Hold', Duration(seconds: 4), '4s'),
  exhale('Exhale', Duration(seconds: 4), '4s'),
  rest('Rest', Duration(seconds: 2), '');

  const BreathingPhase(this.label, this.duration, this.badge);

  final String label;
  final Duration duration;
  final String badge;

  BreathingPhase get next => switch (this) {
        BreathingPhase.inhale => BreathingPhase.hold,
        BreathingPhase.hold => BreathingPhase.exhale,
        BreathingPhase.exhale => BreathingPhase.rest,
        BreathingPhase.rest => BreathingPhase.inhale,
      };

  /// Target scale of the breathing circle for this phase, mirroring
  /// `getBreathingScale()` in the source (inhale/hold expand to 1.5x,
  /// exhale/rest settle back to 1x).
  double get scale => switch (this) {
        BreathingPhase.inhale || BreathingPhase.hold => 1.5,
        BreathingPhase.exhale || BreathingPhase.rest => 1.0,
      };
}

/// The Helpline / "Safe Haven" tab: counselor chat CTA, quick-action
/// buttons, a guided box-breathing exercise, and an FAQ accordion.
///
/// `HelplineScreen.tsx` uses `useState` for `openAccordion` and
/// `breathingPhase`, plus a chained-`setTimeout` `useEffect` to drive the
/// breathing cycle. That combination of local state + a side effect with
/// cleanup is exactly what maps to a [StatefulWidget]:
///   - `useState`   -> fields in [State], updated via [setState]
///   - `useEffect`  -> effect body runs in [initState]
///   - the effect's cleanup function (`return () => clearTimeout(...)`)
///     -> [dispose]
class HelplineScreen extends StatefulWidget {
  const HelplineScreen({super.key});

  @override
  State<HelplineScreen> createState() => _HelplineScreenState();
}

class _HelplineScreenState extends State<HelplineScreen> {
  String? _openAccordionId;
  BreathingPhase _breathingPhase = BreathingPhase.inhale;
  bool _breathingPaused = false;
  bool _hasStarted = false;
  Timer? _tickTimer;
  int _secondsRemaining = 4;

  @override
  void initState() {
    super.initState();
    // Wait for user to manually start
  }

  @override
  void dispose() {
    _tickTimer?.cancel();
    super.dispose();
  }

  void _startExercise() {
    setState(() {
      _hasStarted = true;
      _breathingPaused = false;
      _breathingPhase = BreathingPhase.inhale;
      _secondsRemaining = BreathingPhase.inhale.duration.inSeconds;
    });
    _startTicker();
  }

  void _startTicker() {
    _tickTimer?.cancel();
    _tickTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_breathingPaused) return;
      if (!mounted) return;

      setState(() {
        if (_secondsRemaining > 1) {
          _secondsRemaining--;
        } else {
          _breathingPhase = _breathingPhase.next;
          _secondsRemaining = _breathingPhase.duration.inSeconds;
        }
      });
    });
  }

  void _togglePauseExercise() {
    setState(() => _breathingPaused = !_breathingPaused);
  }

  void _toggleAccordion(String id) {
    setState(() {
      _openAccordionId = _openAccordionId == id ? null : id;
    });
  }

  Future<void> _callCrisisLine() async {
    final uri = Uri(scheme: 'tel', path: '1098');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }

  Future<void> _startAnonymousChat() async {
    final uri = Uri.parse('https://safenet.app/chat');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  Future<void> _sendSilentGuardianPing() async {
    // Placeholder for the "Silent Guardian" SOS ping — would call into a
    // native/background service in a production build.
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Guardian has been notified.')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const _SafeHavenIntro(),
          const SizedBox(height: 24),
          _ChatCard(onStartChat: _startAnonymousChat),
          const SizedBox(height: 24),
          _QuickActionButton(
            icon: Icons.phone_rounded,
            iconBg: AppColors.secondaryTint,
            iconColor: AppColors.secondary,
            title: 'Call 24/7 Crisis...',
            subtitle: 'Toll-Free • Dial 1098 or...',
            actionLabel: 'Call Now',
            actionIcon: Icons.phone_rounded,
            actionBg: AppColors.primaryTint,
            actionColor: AppColors.primary,
            onTap: _callCrisisLine,
          ),
          const SizedBox(height: 12),
          _QuickActionButton(
            icon: Icons.send_rounded,
            iconBg: AppColors.primaryTint,
            iconColor: AppColors.primary,
            title: 'Silent Guardia...',
            subtitle: 'Pings your trusted p...',
            actionLabel: 'Send SOS',
            actionIcon: Icons.send_rounded,
            actionBg: AppColors.canvas,
            actionColor: AppColors.primary,
            actionBordered: true,
            onTap: _sendSilentGuardianPing,
          ),
          const SizedBox(height: 16),
          _GroundingExercise(
            phase: _breathingPhase,
            secondsRemaining: _secondsRemaining,
            paused: _breathingPaused,
            hasStarted: _hasStarted,
            onStart: _startExercise,
            onTogglePause: _togglePauseExercise,
          ),
          const SizedBox(height: 8),
          _FaqSection(
            openId: _openAccordionId,
            onToggle: _toggleAccordion,
          ),
        ],
      ),
    );
  }
}

class _SafeHavenIntro extends StatelessWidget {
  const _SafeHavenIntro();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: AppColors.surfaceTint.withOpacity(0.3),
        borderRadius: BorderRadius.circular(32),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: AppColors.secondaryTint,
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.eco_rounded,
                  size: 14,
                  color: AppColors.secondary,
                ),
              ),
              const SizedBox(width: 8),
              const Text(
                'SAFE HAVEN 24/7',
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.2,
                  color: AppColors.textSubtle,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          RichText(
            text: const TextSpan(
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                letterSpacing: -0.4,
                color: AppColors.text,
              ),
              children: [
                TextSpan(text: 'You are never alone '),
                TextSpan(
                  text: '💙',
                  style: TextStyle(color: AppColors.primary),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          const Text(
            'Free, confidential, and completely anonymous. Nothing you '
            'share will be stored or shared with anyone.',
            style: TextStyle(
              fontSize: 14,
              height: 1.5,
              color: AppColors.textSubtle,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Container(
                width: 8,
                height: 8,
                decoration: const BoxDecoration(
                  color: AppColors.secondary,
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 8),
              const Text(
                'counselors online',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: AppColors.text,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _ChatCard extends StatelessWidget {
  const _ChatCard({required this.onStartChat});

  final VoidCallback onStartChat;

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
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: AppColors.primaryTint,
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.chat_bubble_rounded,
                  size: 24,
                  color: AppColors.primary,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Chat with a\nCounselor',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: AppColors.text,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Row(
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
                        const Flexible(
                          child: Text(
                            'Online now • Typical reply < 1 min',
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w600,
                              color: AppColors.secondary,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.canvas,
                  borderRadius: BorderRadius.circular(999),
                ),
                child: const Text(
                  'ENCRYPTED',
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 0.5,
                    color: AppColors.textSubtle,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          const Text(
            'Message privately with trained youth listeners who '
            'understand online pressure, drama, bullying, or feeling down.',
            style: TextStyle(
              fontSize: 14,
              height: 1.5,
              color: AppColors.textSubtle,
            ),
          ),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: onStartChat,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(999),
                ),
                elevation: 0,
              ),
              icon: const Icon(Icons.chat_bubble_rounded, size: 18),
              label: const Text(
                'Start Anonymous Chat',
                style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _QuickActionButton extends StatelessWidget {
  const _QuickActionButton({
    required this.icon,
    required this.iconBg,
    required this.iconColor,
    required this.title,
    required this.subtitle,
    required this.actionLabel,
    required this.actionIcon,
    required this.actionBg,
    required this.actionColor,
    required this.onTap,
    this.actionBordered = false,
  });

  final IconData icon;
  final Color iconBg;
  final Color iconColor;
  final String title;
  final String subtitle;
  final String actionLabel;
  final IconData actionIcon;
  final Color actionBg;
  final Color actionColor;
  final bool actionBordered;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: AppColors.surface,
      borderRadius: BorderRadius.circular(999),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(999),
        child: Container(
          padding: const EdgeInsets.fromLTRB(8, 8, 20, 8),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(999),
            border: Border.all(color: AppColors.border.withOpacity(0.3)),
            boxShadow: AppColors.ambient1,
          ),
          child: Row(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(color: iconBg, shape: BoxShape.circle),
                child: Icon(icon, size: 20, color: iconColor),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      title,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                        color: AppColors.text,
                      ),
                    ),
                    Text(
                      subtitle,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontSize: 11,
                        color: AppColors.textSubtle,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: actionBg,
                  borderRadius: BorderRadius.circular(999),
                  border: actionBordered
                      ? Border.all(color: AppColors.border)
                      : null,
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(actionIcon, size: 14, color: actionColor),
                    const SizedBox(width: 6),
                    Text(
                      actionLabel,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: actionColor,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _GroundingExercise extends StatelessWidget {
  const _GroundingExercise({
    required this.phase,
    required this.secondsRemaining,
    required this.paused,
    required this.hasStarted,
    required this.onStart,
    required this.onTogglePause,
  });

  final BreathingPhase phase;
  final int secondsRemaining;
  final bool paused;
  final bool hasStarted;
  final VoidCallback onStart;
  final VoidCallback onTogglePause;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppColors.canvas,
      padding: const EdgeInsets.only(top: 16),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Row(
                children: [
                  Icon(Icons.eco_rounded, size: 14, color: AppColors.secondary),
                  SizedBox(width: 8),
                  Text(
                    '1-MIN GROUNDING',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1,
                      color: AppColors.secondary,
                    ),
                  ),
                ],
              ),
              const Text(
                'Box Breathing',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textSubtle,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          const Text(
            'Feeling Overwhelmed?',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppColors.text,
            ),
          ),
          const SizedBox(height: 8),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: Text(
              'Take a moment to center your breath. Follow the rhythm '
              'below.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 14, color: AppColors.textSubtle),
            ),
          ),
          const SizedBox(height: 32),
          SizedBox(
            height: 192,
            child: Center(
              child: AnimatedScale(
                scale: hasStarted ? phase.scale : 1.0,
                // Match the AnimatedScale duration to the current phase so it sweeps perfectly
                duration: phase.duration,
                curve: Curves.linear,
                child: Container(
                  width: 128,
                  height: 128,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: AppColors.secondaryTint.withOpacity(0.4),
                    shape: BoxShape.circle,
                  ),
                  child: Container(
                    width: 96,
                    height: 96,
                    decoration: const BoxDecoration(
                      color: AppColors.secondaryTint,
                      shape: BoxShape.circle,
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          !hasStarted ? 'Ready' : phase.label,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            color: AppColors.secondary,
                          ),
                        ),
                        if (hasStarted && phase.badge.isNotEmpty)
                          Text(
                            '${secondsRemaining}s',
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.w600,
                              color: AppColors.secondary.withOpacity(0.7),
                            ),
                          ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 8),
          TextButton(
            onPressed: !hasStarted ? onStart : onTogglePause,
            style: TextButton.styleFrom(
              backgroundColor: AppColors.surfaceTint,
              foregroundColor: AppColors.text,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 10),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(999),
              ),
            ),
            child: Text(
              !hasStarted 
                  ? '▷ Start Exercise' 
                  : paused ? '▷ Resume Exercise' : '↺ Pause Exercise',
              style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
            ),
          ),
        ],
      ),
    );
  }
}

class _FaqSection extends StatelessWidget {
  const _FaqSection({required this.openId, required this.onToggle});

  final String? openId;
  final ValueChanged<String> onToggle;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Expanded(
                child: Text(
                  'What are you going through?',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: AppColors.text,
                  ),
                ),
              ),
              const Padding(
                padding: EdgeInsets.only(bottom: 4),
                child: Text(
                  'Tap for guidance',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textSubtle,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          for (var i = 0; i < FaqItem.defaults.length; i++) ...[
            FaqAccordionItem(
              faq: FaqItem.defaults[i],
              isOpen: openId == FaqItem.defaults[i].id,
              onTap: () => onToggle(FaqItem.defaults[i].id),
            ),
            if (i != FaqItem.defaults.length - 1) const SizedBox(height: 12),
          ],
        ],
      ),
    );
  }
}
