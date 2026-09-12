import 'package:flutter/material.dart';

import '../models/nav_tab.dart';
import '../theme/app_colors.dart';

/// Bottom tab bar with three destinations: Home, Helpline, Settings.
///
/// Stateless — `activeTab` and `onTabSelected` are passed down from the root
/// [App] widget, exactly as `BottomNav.tsx` receives `activeTab` /
/// `setActiveTab` as props rather than owning the state itself.
class BottomNavBar extends StatelessWidget {
  const BottomNavBar({
    super.key,
    required this.activeTab,
    required this.onTabSelected,
  });

  final AppTab activeTab;
  final ValueChanged<AppTab> onTabSelected;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.canvas,
        border: Border(
          top: BorderSide(color: AppColors.border.withOpacity(0.5)),
        ),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          for (final item in NavItem.all)
            _NavButton(
              item: item,
              isActive: activeTab == item.tab,
              onTap: () => onTabSelected(item.tab),
            ),
        ],
      ),
    );
  }
}

class _NavButton extends StatelessWidget {
  const _NavButton({
    required this.item,
    required this.isActive,
    required this.onTap,
  });

  final NavItem item;
  final bool isActive;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final Color color =
        isActive ? AppColors.primary : AppColors.textSubtle;

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: ConstrainedBox(
        constraints: const BoxConstraints(minWidth: 64),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: isActive
                    ? AppColors.primaryTint.withOpacity(0.5)
                    : Colors.transparent,
                shape: BoxShape.circle,
              ),
              child: Icon(
                isActive ? item.activeIcon : item.icon,
                size: 24,
                color: color,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              item.label,
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w600,
                letterSpacing: 0.2,
                color: color,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
