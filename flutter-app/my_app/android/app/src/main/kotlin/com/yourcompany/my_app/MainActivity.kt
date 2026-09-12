package com.yourcompany.my_app

import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import androidx.localbroadcastmanager.content.LocalBroadcastManager

class MainActivity: FlutterActivity() {
    private val CHANNEL = "guardrail/text_stream"
    private var methodChannel: MethodChannel? = null

    private val receiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            val text = intent.getStringExtra("text")
            val source = intent.getStringExtra("source")
            val senderApp = intent.getStringExtra("senderApp") ?: "unknown"
            if (text != null) {
                // Send the captured text up to Flutter
                methodChannel?.invokeMethod("onTextCaptured", mapOf("text" to text, "source" to source, "senderApp" to senderApp))
            }
        }
    }

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        methodChannel = MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL)
        
        // Listen for broadcasts from our background services
        LocalBroadcastManager.getInstance(this)
            .registerReceiver(receiver, IntentFilter("GuardrailEvent"))
    }

    override fun onDestroy() {
        LocalBroadcastManager.getInstance(this).unregisterReceiver(receiver)
        super.onDestroy()
    }
}