import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDL2lOLmAgpNm9FBvuAtTqtFmdO8antZtU",
  appId: "1:716204277840:web:aa75f58a487ad808559155",
  messagingSenderId: "716204277840",
  projectId: "safenet-7d829",
  storageBucket: "safenet-7d829.firebasestorage.app",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };

