import 'package:flutter/material.dart';

/// Design tokens ported 1:1 from `src/index.css`'s Tailwind `@theme` block.
///
/// Keeping these as named [Color] constants (rather than inlining hex values
/// throughout the widget tree) mirrors the intent of the original CSS custom
/// properties: a single source of truth for the brand palette.
abstract final class AppColors {
  // Primary (blue)
  static const Color primary = Color(0xFF005DA7);
  static const Color primaryLight = Color(0xFF7BB2FF);
  static const Color primaryTint = Color(0xFFEAF2FE);

  // Secondary (green)
  static const Color secondary = Color(0xFF006C46);
  static const Color secondaryLight = Color(0xFF5ED19C);
  static const Color secondaryTint = Color(0xFF84F9BD);

  // Surfaces
  static const Color canvas = Color(0xFFF8F9FF);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color surfaceTint = Color(0xFFE5EEFF);

  // Text
  static const Color text = Color(0xFF0B1C30);
  static const Color textSubtle = Color(0xFF414751);
  static const Color border = Color(0xFFDCE9FF);

  // Alert
  static const Color alert = Color(0xFFFFA873);
  static const Color alertBg = Color(0xFFFFF5EE);

  // Misc, used by the phone-frame chrome on wide viewports.
  static const Color frameBezel = Color(0xFF262626); // neutral-800

  /// Ambient shadow used throughout the original design
  /// (`--shadow-ambient-1`): a soft, cool-toned elevation.
  static List<BoxShadow> ambient1 = [
    BoxShadow(
      color: primaryLight.withOpacity(0.08),
      blurRadius: 16,
      offset: const Offset(0, 4),
      spreadRadius: -2,
    ),
  ];

  /// `--shadow-ambient-2`
  static List<BoxShadow> ambient2 = [
    BoxShadow(
      color: primaryLight.withOpacity(0.12),
      blurRadius: 28,
      offset: const Offset(0, 10),
      spreadRadius: -4,
    ),
  ];

  /// `--shadow-ambient-3`
  static List<BoxShadow> ambient3 = [
    BoxShadow(
      color: const Color(0xFF1E293B).withOpacity(0.10),
      blurRadius: 40,
      offset: const Offset(0, 18),
      spreadRadius: -8,
    ),
  ];
}
