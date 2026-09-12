package com.yourcompany.my_app

import android.accessibilityservice.AccessibilityService
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
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

    override fun onAccessibilityEvent(event: AccessibilityEvent) {
        val packageName = event.packageName?.toString() ?: return
        
        if (targetApps.contains(packageName)) {
            val rootNode = rootInActiveWindow ?: return
            val capturedText = StringBuilder()
            
            extractText(rootNode, capturedText)
            
            if (capturedText.isNotEmpty()) {
                val intent = Intent("GuardrailEvent")
                intent.putExtra("source", "accessibility")
                intent.putExtra("text", capturedText.toString())
                intent.putExtra("senderApp", packageName)
                LocalBroadcastManager.getInstance(this).sendBroadcast(intent)
            }
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

