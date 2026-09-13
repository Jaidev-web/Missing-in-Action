import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    const body = await request.json();
    const { child_id, text, risk_level, threat_score, senderApp } = body;

    if (!child_id) {
      return NextResponse.json({ error: 'Missing child_id' }, { status: 400 });
    }

    // Write directly to the Firebase using the client SDK
    const threatsRef = collection(db, 'users', child_id, 'threat_events');
    
    await addDoc(threatsRef, {
      text: text || "Unknown intercepted text",
      risk_level: risk_level || "CRITICAL",
      threat_score: threat_score || 92.5,
      senderApp: senderApp || "WhatsApp",
      timestamp: serverTimestamp()
    });

    return NextResponse.json({ success: true, message: 'Threat posted directly to Web Firebase' });
  } catch (error) {
    console.error('Error posting threat to web:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

