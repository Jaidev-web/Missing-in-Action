# DESIGN.md: Digital Guardrail

## 1. System Architecture Map

```text
┌─────────────────────┐        ┌──────────────────────┐        ┌───────────────────────┐
│   Flutter Client    │        │   FastAPI Backend    │        │   Next.js Dashboard   │
│   (teen's device)   │        │   (hybrid trigger)   │        │   (parent, web)       │
│                     │        │                      │        │                       │
│ NotificationListener│──────▶ │  /classify           │        │  Realtime alert feed  │
│ AccessibilityService│ https  │  XGBoost Classifier  │        │  Consent & pairing UI │
│ Local regex filter  │ (only  │  Score → delete text │        │  Severity + category  │
│ Consent & status UI │ flagged│                      │        │  view (no raw text)   │
└──────────┬──────────┘ msgs)  └───────────┬──────────┘        └───────────┬───────────┘
           │                               │ writes alert doc              │ subscribes
           │                               ▼                               │
           │                     ┌────────────────────┐                    │
           └────────────────────▶│      Firebase      │◀───────────────────┘
              pairing / auth     │ • Auth             │
              status heartbeat   │ • Firestore        │
                                 │ • Cloud Messaging  │
                                 └────────────────────┘
```

## The Edge Node: Android / Flutter (The Child's Device)
The mobile client acts as a silent, zero-persistence monitor utilizing a dual-interception strategy to capture both background and foreground chat activity without requiring root access.

**Background Interception (NotificationListenerService)**: Catches incoming message payloads from platforms like WhatsApp, Instagram, and Discord before the user opens the application.

**Foreground Interception (AccessibilityService)**: Solves the "active app" dilemma. When a chat app is open and notifications are suppressed by the OS, this "God Mode" service programmatically reads the visible text nodes on the screen in real-time.

**Fallback Keyboard**: A rudimentary custom Android keyboard built in Flutter can be deployed to natively capture outgoing keystrokes.

**The Hybrid Trigger (Local Filtering)**: To conserve battery and protect privacy, the app runs a hardcoded, lightweight Regex dictionary of grooming/bullying tactics locally. Only text that trips this local wire is processed further. Routine safe conversations never leave the device.

