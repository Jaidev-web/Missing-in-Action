import 'package:flutter/material.dart';

import 'models/nav_tab.dart';
import 'theme/app_colors.dart';
import 'theme/app_theme.dart';
import 'widgets/app_header.dart';
import 'widgets/bottom_nav_bar.dart';
import 'widgets/auth_gate.dart';
import 'screens/home_screen.dart';
import 'screens/helpline_screen.dart';
import 'screens/settings_screen.dart';

/// Root widget, analogous to `main.tsx`'s `createRoot(...).render(<App />)`.
class SafeNetApp extends StatelessWidget {
  const SafeNetApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SafeNET',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      home: const AuthGate(child: _RootShell()),
    );
  }
}

/// Owns the single piece of navigation state for the app and lays out the
/// header / active screen / bottom nav column.
///
/// This is the direct port of `App.tsx`: `activeTab` was `useState('home')`
/// there, and becomes a field on this [State] here, updated via [setState]
/// from the same place the React version calls `setActiveTab`.
class _RootShell extends StatefulWidget {
  const _RootShell();

  @override
  State<_RootShell> createState() => _RootShellState();
}

class _RootShellState extends State<_RootShell> {
  AppTab _activeTab = AppTab.home;

  void _onTabSelected(AppTab tab) => setState(() => _activeTab = tab);

  Widget _buildActiveScreen() {
    return switch (_activeTab) {
      AppTab.home => const HomeScreen(),
      AppTab.helpline => const HelplineScreen(),
      AppTab.settings => const SettingsScreen(),
    };
  }

  @override
  Widget build(BuildContext context) {
    final Widget appBody = Container(
      color: AppColors.canvas,
      child: Column(
        children: [
          AppHeader(activeTab: _activeTab),
          Expanded(child: _buildActiveScreen()),
          SafeArea(
            top: false,
            child: BottomNavBar(
              activeTab: _activeTab,
              onTabSelected: _onTabSelected,
            ),
          ),
        ],
      ),
    );

    // React's `sm:` breakpoint (>=640px) swaps the container from a
    // full-bleed mobile view to a framed "device" card, capped at 480x800
    // with rounded corners, a shadow, and a dark bezel border. LayoutBuilder
    // is the Flutter equivalent of that media-query-driven responsive
    // switch.
    return Scaffold(
      backgroundColor: const Color(0xFFF5F5F5), // neutral-100
      body: LayoutBuilder(
        builder: (context, constraints) {
          final bool isWideViewport = constraints.maxWidth >= 640;

          if (!isWideViewport) {
            return SafeArea(child: appBody);
          }

          return Center(
            child: Container(
              width: 480,
              height: 800,
              clipBehavior: Clip.antiAlias,
              decoration: BoxDecoration(
                color: AppColors.canvas,
                borderRadius: BorderRadius.circular(40),
                border: Border.all(color: AppColors.frameBezel, width: 8),
                boxShadow: AppColors.ambient3,
              ),
              child: appBody,
            ),
          );
        },
      ),
    );
  }
}
