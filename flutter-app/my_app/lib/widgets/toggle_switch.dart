import 'package:flutter/material.dart';

import '../theme/app_colors.dart';

/// A pill-shaped on/off switch with a sliding thumb.
///
/// `Toggle.tsx` is a controlled component: it owns no state of its own,
/// just a `checked` prop and an `onChange` callback, and uses
/// `framer-motion`'s spring animation to slide the thumb. The Flutter
/// equivalent doesn't need a [StatefulWidget] either — [AnimatedAlign]
/// already animates implicitly whenever `checked` changes, which is the
/// direct analogue of Framer Motion's `animate={{ x: ... }}`.
class ToggleSwitch extends StatelessWidget {
  const ToggleSwitch({
    super.key,
    required this.checked,
    required this.onChanged,
  });

  final bool checked;
  final ValueChanged<bool> onChanged;

  static const double _width = 48;
  static const double _height = 28;
  static const double _thumbSize = 24;
  static const double _padding = 2;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      toggled: checked,
      label: 'Toggle switch',
      child: GestureDetector(
        onTap: () => onChanged(!checked),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOutCubic,
          width: _width,
          height: _height,
          padding: const EdgeInsets.symmetric(horizontal: _padding),
          decoration: BoxDecoration(
            color: checked ? AppColors.secondary : AppColors.border,
            borderRadius: BorderRadius.circular(999),
          ),
          child: AnimatedAlign(
            duration: const Duration(milliseconds: 300),
            // A slightly overshooting curve approximates the
            // `{ type: 'spring', stiffness: 500, damping: 30 }` feel from
            // the original component.
            curve: Curves.easeOutBack,
            alignment:
                checked ? Alignment.centerRight : Alignment.centerLeft,
            child: Container(
              width: _thumbSize,
              height: _thumbSize,
              decoration: BoxDecoration(
                color: Colors.white,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.12),
                    blurRadius: 2,
                    offset: const Offset(0, 1),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
