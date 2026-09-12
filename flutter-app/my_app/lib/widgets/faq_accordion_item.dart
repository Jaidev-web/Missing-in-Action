import 'package:flutter/material.dart';

import '../models/faq_item.dart';
import '../theme/app_colors.dart';

/// A single expandable row in the Helpline screen's FAQ list.
///
/// Like [ToggleSwitch], this is a controlled, stateless component: the
/// expanded/collapsed flag (`isOpen`) lives in the parent's state (see
/// `HelplineScreen`'s `_openAccordionId`), mirroring the React version where
/// `openAccordion` is owned by `HelplineScreen` and each card just receives
/// a derived boolean. [AnimatedSize] + [AnimatedRotation] stand in for
/// `framer-motion`'s `AnimatePresence` height/opacity animation and the
/// chevron's `rotate-180` class.
class FaqAccordionItem extends StatelessWidget {
  const FaqAccordionItem({
    super.key,
    required this.faq,
    required this.isOpen,
    required this.onTap,
  });

  final FaqItem faq;
  final bool isOpen;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.border.withOpacity(0.3)),
        boxShadow: AppColors.ambient1,
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          InkWell(
            onTap: onTap,
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  Expanded(
                    child: Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: AppColors.primaryTint,
                            shape: BoxShape.circle,
                          ),
                          child: Icon(
                            faq.icon,
                            size: 16,
                            color: AppColors.primary,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Text(
                            faq.title,
                            style: const TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: 15,
                              height: 1.3,
                              color: AppColors.text,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 8),
                  AnimatedRotation(
                    turns: isOpen ? 0.5 : 0,
                    duration: const Duration(milliseconds: 300),
                    child: const Icon(
                      Icons.keyboard_arrow_down_rounded,
                      size: 20,
                      color: AppColors.textSubtle,
                    ),
                  ),
                ],
              ),
            ),
          ),
          AnimatedSize(
            duration: const Duration(milliseconds: 200),
            curve: Curves.easeInOut,
            child: isOpen
                ? Padding(
                    padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                    child: Text(
                      faq.content,
                      style: const TextStyle(
                        fontSize: 14,
                        height: 1.5,
                        color: AppColors.textSubtle,
                      ),
                    ),
                  )
                : const SizedBox(width: double.infinity, height: 0),
          ),
        ],
      ),
    );
  }
}
