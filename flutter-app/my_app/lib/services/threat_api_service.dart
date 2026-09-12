import 'dart:convert';
import 'package:http/http.dart' as http;

class ThreatApiService {
  // TODO: Replace with your actual server IP when deploying or testing on a physical device.
  // For Android emulator pointing to localhost, use 10.0.2.2
  static const String baseUrl = "http://10.0.2.2:8000";

  static Future<Map<String, dynamic>> analyzeThreat({
    required String text,
    required String childId,
    required String senderApp,
  }) async {
    final response = await http.post(
      Uri.parse("$baseUrl/analyze-threat"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "text": text,
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
    final response = await http.post(
      Uri.parse("$baseUrl/analyze-batch"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"messages": messages}),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception("Failed to analyze batch: ${response.statusCode} ${response.body}");
    }
  }
}

