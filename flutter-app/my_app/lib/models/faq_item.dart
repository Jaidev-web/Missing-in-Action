import 'package:flutter/material.dart';

/// One entry in the Helpline screen's "What are you going through?"
/// accordion list.
///
/// Replaces the ad-hoc `{ id, title, icon: <JSX>, content }` object literals
/// used in `HelplineScreen.tsx` with a proper, strongly-typed model.
@immutable
class FaqItem {
  const FaqItem({
    required this.id,
    required this.title,
    required this.icon,
    required this.content,
  });

  final String id;
  final String title;
  final IconData icon;
  final String content;

  /// Ported from the `faqs` array in `HelplineScreen.tsx`.
  ///
  /// Note: the source data had two icons referencing components that were
  /// never imported in that file (a `Shield` icon for the blackmail item and
  /// a `Frown` icon for the "feeling down" item). Both are supplied correctly
  /// here.
  static const List<FaqItem> defaults = [
    FaqItem(
      id: 'rumors',
      title: 'Someone is spreading rumors or lies',
      icon: Icons.person_outline_rounded,
      content:
          'It can be incredibly painful when people say untrue things. Try '
          'to document the messages without responding immediately. Reach '
          'out to a trusted adult or our counselors here for support on how '
          'to handle the situation safely.',
    ),
    FaqItem(
      id: 'excluded',
      title: 'Being excluded or targeted in group chats',
      icon: Icons.person_remove_outlined,
      content:
          'Feeling left out or targeted is tough. Remember that their '
          'behavior says more about them than you. You have the right to '
          'mute or leave toxic groups.',
    ),
    FaqItem(
      id: 'threats',
      title: 'Threatened with private photos / blackmail',
      icon: Icons.shield_outlined,
      content:
          'This is a serious situation, but you are not alone. Do not give '
          'in to demands. Take screenshots, block the person, and tell an '
          'adult immediately. This is illegal and help is available.',
    ),
    FaqItem(
      id: 'feeling-down',
      title: 'Feeling down, anxious, or hopeless',
      icon: Icons.sentiment_dissatisfied_outlined,
      content:
          'These feelings are valid, especially when dealing with online '
          'stress. Please tap the "Chat with a Counselor" button above to '
          'talk to someone who understands right now.',
    ),
  ];
}
