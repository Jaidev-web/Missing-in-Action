import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class FirestoreService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;
  
  String get _userId {
    final uid = FirebaseAuth.instance.currentUser?.uid;
    if (uid == null) {
      throw Exception('User is not authenticated');
    }
    return uid;
  }

  DocumentReference<Map<String, dynamic>> get _userDoc => _db.collection('users').doc(_userId);

  /// Streams the user's settings document in real-time.
  Stream<DocumentSnapshot<Map<String, dynamic>>> streamUserSettings() {
    return _userDoc.snapshots();
  }

  /// Updates a specific setting key in the user's document.
  Future<void> updateSetting(String key, dynamic value) async {
    try {
      await _userDoc.set(
        {key: value},
        SetOptions(merge: true),
      );
    } catch (e) {
      print('Error updating setting $key: $e');
    }
  }

  /// Adds a new guardian to the array in Firestore.
  Future<void> addGuardian(String guardianName) async {
    try {
      await _userDoc.set(
        {
          'guardians': FieldValue.arrayUnion([guardianName])
        },
        SetOptions(merge: true),
      );
    } catch (e) {
      print('Error adding guardian: $e');
    }
  }
  
  /// Removes a guardian from the array in Firestore.
  Future<void> removeGuardian(String guardianName) async {
    try {
      await _userDoc.set(
        {
          'guardians': FieldValue.arrayRemove([guardianName])
        },
        SetOptions(merge: true),
      );
    } catch (e) {
      print('Error removing guardian: $e');
    }
  }
}
