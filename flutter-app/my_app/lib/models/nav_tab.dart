import 'package:flutter/material.dart';

/// The set of primary destinations reachable from [BottomNavBar].
///
/// The original React code drives navigation off a raw `string` returned by
/// `useState('home')`. Dart's sound null safety and exhaustive `switch`
/// checking make a raw string an anti-pattern here, so this is modeled as an
/// enum instead — the compiler now guarantees every tab is handled.
enum AppTab {
  home('Home'),
  helpline('Helpline'),
  settings('Settings');

  const AppTab(this.label);

  /// Human-readable label, e.g. shown in the [Header] pill and nav bar.
  final String label;
}

/// Describes one entry in the bottom navigation bar: which [AppTab] it
/// activates, the icon to display, and its label.
@immutable
class NavItem {
  const NavItem({
    required this.tab,
    required this.icon,
    required this.activeIcon,
  });

  final AppTab tab;
  final IconData icon;

  /// A slightly bolder icon shown when this tab is active, mirroring the
  /// React version's `strokeWidth={isActive ? 2.5 : 2}` treatment.
  final IconData activeIcon;

  String get label => tab.label;

  /// Static, ordered list matching `BottomNav.tsx`'s `navItems` array.
  static const List<NavItem> all = [
    NavItem(
      tab: AppTab.home,
      icon: Icons.home_outlined,
      activeIcon: Icons.home_rounded,
    ),
    NavItem(
      tab: AppTab.helpline,
      icon: Icons.headset_outlined,
      activeIcon: Icons.headset_rounded,
    ),
    NavItem(
      tab: AppTab.settings,
      icon: Icons.settings_outlined,
      activeIcon: Icons.settings_rounded,
    ),
  ];
}
