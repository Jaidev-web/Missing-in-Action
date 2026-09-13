import 'dart:convert';
import 'dart:io' show Platform;
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'firebase_options.dart';

import 'app.dart';
import 'services/threat_api_service.dart';

/// Equivalent of `main.tsx`'s
/// `createRoot(document.getElementById('root')!).render(<StrictMode><App />
/// </StrictMode>)`.
///
/// `runApp` is Flutter's mount point, the same role `createRoot(...).render`
/// plays for the DOM. Flutter has no direct analogue to React's
/// `<StrictMode>` — its dev-time double-invoke behavior for catching side
/// effects — so it's simply omitted; `flutter analyze` plus the framework's
/// own assertions cover the equivalent class of bugs in debug builds.
/// GuardrailEngine listens to real-time text captured by native platform channels
/// (e.g. Android Accessibility / Notification listener services).
/// It applies an on-device regex pre-filter before dispatching suspicious events to the AI backend.
class GuardrailEngine {
  static const platform = MethodChannel('guardrail/text_stream');

  // Hardcoded lightweight regex for local edge filtering
  // Add common Hinglish grooming/bullying slang here
  final RegExp threatRegex = RegExp(
    r"(don't tell|secret|mummy ko mat bolna|delete this|hate you|mar ja|meet me)",
    caseSensitive: false,
  );

  /// Target endpoint for FastAPI threat analysis.
  /// - Android Emulator: 'http://10.0.2.2:8000/analyze-threat'
  /// - Real Device: 'http://<your-laptop-ip>:8000/analyze-threat'
  final String backendUrl;

  GuardrailEngine({
    this.backendUrl = 'http://192.168.1.XX:8000/analyze-threat',
  });

  void startListening() {
    platform.setMethodCallHandler((call) async {
      if (call.method == "onTextCaptured") {
        final dynamic args = call.arguments;
        final String capturedText =
            (args is Map ? args['text'] : null)?.toString() ?? '';
        final String source =
            (args is Map ? args['source'] : null)?.toString() ?? 'unknown';
        final String senderApp =
            (args is Map ? args['senderApp'] : null)?.toString() ?? 'unknown';

        if (capturedText.isNotEmpty) {
          _processTextZeroPersistence(capturedText, source: source, senderApp: senderApp);
        }
      }
    });
  }

  void _processTextZeroPersistence(String text, {String source = 'unknown', String senderApp = 'unknown'}) {
    // 1. Check local Regex
    if (threatRegex.hasMatch(text)) {
      debugPrint(
        "🚨 SUSPICIOUS PATTERN DETECTED LOCALLY ($source). Sending to Cloud AI.",
      );
      _sendToFastAPI(text, senderApp);
    } else {
      // 2. ZERO PERSISTENCE: If safe, do nothing. 
      // The 'text' variable will be instantly garbage collected.
      debugPrint("Chat is safe ($source). Ignoring.");
    }
  }

  Future<void> _sendToFastAPI(String text, String senderApp) async {
    final user = FirebaseAuth.instance.currentUser;
    debugPrint("🔔 Listener fired. User is: ${user?.uid}");
    if (user == null) {
      debugPrint("❌ User is null, aborting FastAPI call!");
      return;
    }
    
    try {
      // 1. Fetch live user settings to check Shield and Bedtime Mode
      final doc = await FirebaseFirestore.instance.collection('users').doc(user.uid).get();
      final data = doc.data() ?? {};
      
      final bool realTimeShield = data['realTimeShield'] ?? true;
      final bool bedtimeMode = data['bedtimeMode'] ?? true;
      
      // Feature 1: Real-Time Screen Shield Toggle
      if (!realTimeShield) {
        debugPrint("🛡️ Real-Time Shield disabled. Skipping analysis.");
        return;
      }
      
      // Feature 2: Quiet Bedtime Mode Time-Gate (9:30 PM to 7:00 AM)
      bool isBedtime = false;
      if (bedtimeMode) {
        final now = DateTime.now();
        if (now.hour > 21 || (now.hour == 21 && now.minute >= 30) || now.hour < 7) {
          isBedtime = true;
          debugPrint("🌙 Quiet Bedtime Mode ACTIVE. We will log the threat silently.");
        }
      }

      // 2. Call FastAPI Backend
      final result = await ThreatApiService.analyzeThreat(
        text: text,
        childId: user.uid,
        senderApp: senderApp,
      );

      debugPrint("Backend Response: $result");
      
      if (result["is_threat"] == true || result["classification"] == "toxic") {
        debugPrint("⚠️ ${result['risk_level']} risk: ${result['threat_score']}%");
        
        // Save to Firebase so the Guardian sees it
        await FirebaseFirestore.instance
            .collection('users')
            .doc(user.uid)
            .collection('threat_events')
            .add({
          'timestamp': FieldValue.serverTimestamp(),
          'senderApp': senderApp,
          'text': text,
          'risk_level': result['risk_level'],
          'isBedtimeMuted': isBedtime, // Flag it so the dashboard knows it was muted
        });
        
        // 3. Trigger Local Alert (unless it's bedtime!)
        if (!isBedtime) {
          debugPrint("🚨 TRIGGERING FULL SCREEN OVERLAY AND VIBRATION!");
          // Since we are in Flutter context, we can pop a dialog if the app is open
          // Or fire a local notification. For now, we print to console.
        }
      }
    } catch (e) {
      debugPrint("Failed to reach FastAPI backend or Firestore: $e");
    }
  }
}

/// Main entrypoint of the SafeNet application.
void main() async {
  // Required to ensure Flutter engine bindings are initialized before calling MethodChannel
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Firebase across all platforms using the manual firebase_options.dart
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  // Start background monitoring for incoming text streams
  final guardrailEngine = GuardrailEngine();
  guardrailEngine.startListening();

  runApp(const SafeNetApp());
}
