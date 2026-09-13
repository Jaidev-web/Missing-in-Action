package com.yourcompany.my_app

import android.accessibilityservice.AccessibilityService
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import android.os.Handler
import android.os.Looper
import android.content.Intent
import androidx.localbroadcastmanager.content.LocalBroadcastManager

class GuardrailAccessibilityService : AccessibilityService() {

    private val targetApps = listOf(
        "com.whatsapp",
        "com.instagram.android",
        "com.snapchat.android",
        "com.facebook.orca",
        "com.facebook.katana",
        "com.twitter.android",
        "org.telegram.messenger"
    )

    private val handler = Handler(Looper.getMainLooper())
    private var pendingRunnable: Runnable? = null
    private var lastCapturedText: String = ""

    override fun onAccessibilityEvent(event: AccessibilityEvent) {
        val packageName = event.packageName?.toString() ?: return
        
        if (targetApps.contains(packageName)) {
            // Cancel any previously scheduled capture
            pendingRunnable?.let { handler.removeCallbacks(it) }
            
            // Schedule a new capture after the screen settles (1 second)
            pendingRunnable = Runnable {
                processScreenContent(packageName)
            }
            handler.postDelayed(pendingRunnable!!, 1000)
        }
    }

    private fun processScreenContent(packageName: String) {
        val rootNode = rootInActiveWindow ?: return
        val capturedText = StringBuilder()
        
        extractText(rootNode, capturedText)
        val extracted = capturedText.toString().trim()
        
        // Only broadcast if the text actually changed
        if (extracted.isNotEmpty() && extracted != lastCapturedText) {
            lastCapturedText = extracted
            
            val intent = Intent("GuardrailEvent")
            intent.putExtra("source", "accessibility")
            intent.putExtra("text", extracted)
            intent.putExtra("senderApp", packageName)
            LocalBroadcastManager.getInstance(this).sendBroadcast(intent)
        }
    }

    private fun extractText(node: AccessibilityNodeInfo?, builder: StringBuilder) {
        if (node == null) return
        
        val text = node.text?.toString()
        if (!text.isNullOrBlank()) {
            builder.append(text).append("\n")
        }
        
        val contentDescription = node.contentDescription?.toString()
        if (!contentDescription.isNullOrBlank()) {
            builder.append(contentDescription).append("\n")
        }

        for (i in 0 until node.childCount) {
            extractText(node.getChild(i), builder)
        }
    }

    override fun onInterrupt() {
        // Required override, nothing to do here usually
    }
}

