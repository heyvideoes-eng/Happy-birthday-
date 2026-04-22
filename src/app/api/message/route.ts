import { NextResponse } from 'next/server';

// PLACEHOLDER BACKEND:
// In a real application, connect this to Supabase or Firebase.
// e.g., const { data } = await supabase.from('messages').select('*').single();

let secretMessage = "Mom, you are the light of my life. Thank you for everything. This message is just for you.";
const SECRET_PHRASE = "i love you mom";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Auth Check
    if (body.action === 'verify') {
      if (body.phrase.toLowerCase().trim() === SECRET_PHRASE) {
        return NextResponse.json({ success: true, message: secretMessage });
      } else {
        return NextResponse.json({ success: false, error: 'Incorrect phrase' }, { status: 401 });
      }
    }

    // Admin Update
    if (body.action === 'update') {
      // In reality, secure this with admin authentication (e.g., NextAuth / Supabase Auth)
      secretMessage = body.newMessage;
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
