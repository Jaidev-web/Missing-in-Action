package com.yourcompany.my_app

import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import android.util.Log

class MainActivity: FlutterActivity() {
    private val CHANNEL = "guardrail/text_stream"
    private var methodChannel: MethodChannel? = null
    
    // Hackathon trick: Buffer messages while Flutter is asleep!
    private val messageQueue = mutableListOf<Map<String, String>>()
    private var isFlutterAwake = false

    private val receiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            val text = intent.getStringExtra("text") ?: return
            val source = intent.getStringExtra("source") ?: "unknown"
            val senderApp = intent.getStringExtra("senderApp") ?: "unknown"
            
            // Native log so we can see it even if Flutter misses it!
            Log.d("GuardrailNative", "Captured text length ${text.length} from $senderApp")
            
            val payload = mapOf("text" to text, "source" to source, "senderApp" to senderApp)
            
            if (isFlutterAwake) {
                methodChannel?.invokeMethod("onTextCaptured", payload)
            } else {
                messageQueue.add(payload)
            }
        }
    }

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        methodChannel = MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL)
        
        LocalBroadcastManager.getInstance(this)
            .registerReceiver(receiver, IntentFilter("GuardrailEvent"))
    }

    override fun onResume() {
        super.onResume()
        isFlutterAwake = true
        
        // The second they open the app, flood Flutter with all the intercepted messages!
        messageQueue.forEach { payload ->
            methodChannel?.invokeMethod("onTextCaptured", payload)
        }
        messageQueue.clear()
    }

    override fun onPause() {
        isFlutterAwake = false
        super.onPause()
    }

    override fun onDestroy() {
        LocalBroadcastManager.getInstance(this).unregisterReceiver(receiver)
        super.onDestroy()
    }
}