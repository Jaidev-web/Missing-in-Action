package com.yourcompany.my_app

import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.content.Intent
import androidx.localbroadcastmanager.content.LocalBroadcastManager

class GuardrailNotificationService : NotificationListenerService() {
    override fun onNotificationPosted(sbn: StatusBarNotification) {
        val packageName = sbn.packageName
        // Only trigger for specific social apps
        val targetApps = listOf(
            "com.whatsapp",
            "com.instagram.android",
            "com.snapchat.android",
            "com.facebook.orca",
            "com.facebook.katana",
            "com.twitter.android",
            "org.telegram.messenger"
        )
        if (targetApps.contains(packageName)) {
            val extras = sbn.notification.extras
            val title = extras.getString("android.title") ?: ""
            val text = extras.getCharSequence("android.text")?.toString() ?: ""
            
            if (text.isNotEmpty()) {
                // Broadcast the text internally to MainActivity
                val intent = Intent("GuardrailEvent")
                intent.putExtra("source", "notification")
                intent.putExtra("text", text)
                intent.putExtra("senderApp", packageName)
                LocalBroadcastManager.getInstance(this).sendBroadcast(intent)
            }
        }
    }
}