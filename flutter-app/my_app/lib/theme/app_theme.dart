import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'app_colors.dart';

/// Builds the app's [ThemeData].
///
/// Mirrors `index.css`:
///   body { font-family: var(--font-sans); background: canvas; color: text; }
abstract final class AppTheme {
  static ThemeData get light {
    final base = ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: AppColors.canvas,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.primary,
        brightness: Brightness.light,
        primary: AppColors.primary,
        secondary: AppColors.secondary,
        surface: AppColors.surface,
      ),
      fontFamily: GoogleFonts.plusJakartaSans().fontFamily,
      textTheme: GoogleFonts.plusJakartaSansTextTheme().apply(
        bodyColor: AppColors.text,
        displayColor: AppColors.text,
      ),
      splashFactory: NoSplash.splashFactory,
      highlightColor: Colors.transparent,
    );

    return base.copyWith(
      textSelectionTheme: base.textSelectionTheme.copyWith(
        cursorColor: AppColors.primary,
        selectionColor: AppColors.primaryTint,
        selectionHandleColor: AppColors.primary,
      ),
    );
  }
}
