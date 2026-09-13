import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:firebase_auth/firebase_auth.dart';

class ThreatApiService {
  static const String baseUrl = "https://cyberbully-check.tail39b525.ts.net";

  static Future<Map<String, String>> _getHeaders() async {
    final headers = {"Content-Type": "application/json"};
    try {
      final user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        final token = await user.getIdToken();
        if (token != null) {
          headers["Authorization"] = "Bearer $token";
        }
      }
    } catch (e) {
      print("Error getting Firebase token: $e");
    }
    return headers;
  }

  static Future<Map<String, dynamic>> analyzeThreat({
    required String text,
    required String childId,
    required String senderApp,
  }) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse("$baseUrl/predict"),
      headers: headers,
      body: jsonEncode({
        "text": text,
        // Including these in case you add logging to the backend later
        "child_id": childId,
        "sender_app": senderApp,
      }),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception("Failed to analyze: ${response.statusCode} ${response.body}");
    }
  }

  static Future<Map<String, dynamic>> analyzeBatch(
      List<Map<String, String>> messages) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse("$baseUrl/predict_batch"),
      headers: headers,
      body: jsonEncode({"messages": messages}),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception("Failed to analyze batch: ${response.statusCode} ${response.body}");
    }
  }
}

