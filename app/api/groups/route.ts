import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/db';

export async function POST(req: NextRequest) {
  const { groupName, wechatId, groupDescription } = await req.json();

  try {
    await db.insertInto('wechat_group').values({
      name: groupName,
      wechat_id: wechatId,
      description: groupDescription,
    }).execute();

    return NextResponse.json({ message: 'Group added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding group:', error);
    return NextResponse.json({ message: 'Error adding group' }, { status: 500 });
  }
}

