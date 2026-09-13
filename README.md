# Missing in Action
GDG Bit N Build
## 📱 System Architecture: Child App vs. Parent App

**Bal Suraksha** operates on a dual-client ecosystem designed to ensure child safety while maintaining privacy and empowering swift parental intervention. 

---

### 1. 🛡️ The Child App (Client-Side Guardrail)
The Child App runs quietly in the background on the minor's mobile device, acting as an intelligent digital shield against predatory behavior and online harassment.

* **Background Text Monitoring:** Listens to incoming chat and messaging notifications across supported social media, chat apps, and gaming platforms.
* **On-Device & Cloud Hybrid Inference:** Seamlessly routes captured message snippets to the secure FastAPI backend for real-time risk evaluation.
* **Multi-Vector Threat Analysis:** Scans content across three specialized, isolated models simultaneously:
  * **Overt Cyberbullying:** Detects direct insults, hate speech, and harassment in English (`cyberbullying_tweets.csv`).
  * **Covert Grooming (PAN-12):** Identifies subtle predatory patterns, isolation tactics, and secrecy requests (`chat_data.csv`).
  * **Regional Slang & Threats:** Captures hybrid code-switching and threats in regional contexts like Hinglish (`hinglish.csv`).
* **Privacy-First Design:** Only processes flagged or incoming communication strings for threat assessment, prioritizing data minimization and secure token handling.

---

### 2. 📊 The Parent App (Dashboard & Intervention Center)
The Parent App serves as the command center for parents or guardians, providing crystal-clear visibility into digital risks without requiring them to read through every benign message.

* **Real-Time Risk Dashboard:** Displays an immediate, non-diluted risk breakdown categorized by threat vectors (Cyberbullying %, Grooming %, and Slang/Threats %).
* **Instant Push Notifications:** Triggers high-priority alerts to the parent's device the moment a message crosses the critical threat threshold ($\ge 70\%$).
* **Contextual Insights:** Shows the flagged message snippet alongside the specific threat category so parents understand the nature of the risk immediately.
* **One-Tap Crisis Intervention Hub:** 
  * **Direct Counselor Connect:** Features dedicated buttons to instantly place calls or messages to professional child psychologists or safety counselors.
  * **Urgent Helplines:** Quick-access links to local emergency child protection services and cybercrime reporting portals.
* **Firebase Authentication & Sync:** Securely links the parent's account to the child's device pairing profile using Firebase Auth and Firestore for real-time state synchronization.


## 🚀 Quick Start & Testing Guide

### 1. App Download & Installation
* **Download Link:** [Get the APK Build Here](https://api.codemagic.io/artifacts/.eJwVwc2SgiAAAOB36e5Mq_TjoYNFLKRmaZrrhXE1QayEUSp5-p39vhnz_m2VFMCitPIDFgIl1hTjK2O6_SIO6jhcwGjifKjd6mNWkRZSIbSTi9cKLE8GHIZHa-1EPklsO9EYFSohtZ_RfXcOGj-D_twkKb8iksTBFuDeLNsgE2X_0k1onUouj4t8IhftulohE9xuTjNAyIh4FvYHNe5ZGZqf81pG7kjNsWsrFk3kDjwxVCRL-33hl7dSh7uTf33H6dIh77i-_MBn6yWYjytpwsLcE9h7lkLbQ8XnmLvHB6masSsF_caxaFI9yLc-2Ekq1o9cQ2b_AmrVl4-32cz-AEDEZCw.nrydqgs95mBtDGk0buMwc2SVuHc)

### 2. Required Device Permissions
For the background monitoring shield to function properly, please configure the following settings after installation:
* **Accessibility Shield:** Go to **Accessibility** $\rightarrow$ Enable **Digital Guardrail ScreenShield** *(If prompted with "Restricted - Access Required", allow restricted settings first)*.
* **Special Permissions:** Navigate to **Special Permissions** $\rightarrow$ Turn on **Notification Permission** and **Running in Background**.
* **Battery Settings:** Ensure background running/execution is allowed to prevent the monitoring service from sleeping.

### 3. Testing Credentials (Firebase Auth)
Use the following pre-configured test accounts to log into the Child and Parent app flows during evaluation:

| Role | Email Address |
| :--- | :--- |
| **Child App Account** | `child@safenet.in` |
| **Parent App Account** | `parent@safenet.in` |
