// app/lib/authMiddleware.ts
import { NextResponse } from 'next/server';
import { auth } from '@/app/auth'; // Adjust the import path as necessary

export async function getAuthSession() {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  return session
}
