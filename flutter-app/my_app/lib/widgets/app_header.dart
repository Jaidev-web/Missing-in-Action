import 'package:flutter/material.dart';

import '../models/nav_tab.dart';
import '../theme/app_colors.dart';

/// Top app bar showing the SafeNET mark, the active tab's pill label, and
/// the user's avatar.
///
/// Purely presentational (no hooks in the source `Header.tsx`), so this is a
/// [StatelessWidget].
class AppHeader extends StatelessWidget {
  const AppHeader({super.key, required this.activeTab});

  final AppTab activeTab;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 32,
                height: 32,
                decoration: const BoxDecoration(
                  color: AppColors.primary,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: Color(0x1A000000),
                      blurRadius: 2,
                      offset: Offset(0, 1),
                    ),
                  ],
                ),
                child: const Icon(
                  Icons.gpp_good_rounded,
                  size: 18,
                  color: Colors.white,
                ),
              ),
              const SizedBox(width: 8),
              Text(
                'SafeNET',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                      letterSpacing: -0.3,
                      color: AppColors.text,
                    ),
              ),
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 4,
                ),
                decoration: BoxDecoration(
                  color: AppColors.secondaryTint,
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Text(
                  activeTab.label,
                  style: const TextStyle(
                    color: AppColors.secondary,
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
          Container(
            width: 36,
            height: 36,
            clipBehavior: Clip.antiAlias,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: AppColors.surface, width: 2),
              boxShadow: AppColors.ambient1,
            ),
            child: Image.network(
              'https://ui-avatars.com/api/?name=Alex+M&background=EAF2FE&color=005da7&bold=true',
              fit: BoxFit.cover,
              // Graceful fallback if the avatar service is unreachable
              // (e.g. offline), matching the resilience an <img> tag needs
              // in production.
              errorBuilder: (context, error, stackTrace) => Container(
                color: AppColors.primaryTint,
                alignment: Alignment.center,
                child: const Text(
                  'AM',
                  style: TextStyle(
                    color: AppColors.primary,
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
