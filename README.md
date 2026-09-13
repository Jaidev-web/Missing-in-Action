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
