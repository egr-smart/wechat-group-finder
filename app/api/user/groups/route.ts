import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/db';
import { getAuthSession } from "@/lib/authMiddleware"

export async function GET() { 
  try {
    const session = await getAuthSession();

    const groups = await db.selectFrom('wechat_group')
                          .select(['id', 'name', 'wechat_id', 'description'])
                          .where('userId', '=', session.user.id)
                          .execute();

    return NextResponse.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { id, groupName, wechatId, groupDescription } = await req.json();

  try {
    const session = await getAuthSession();
    const existingGroup = await db
      .selectFrom('wechat_group')
      .select('id')
      .where('id', '=', id)
      .where('userId', '=', session.user.id)
      .executeTakeFirst();

    if (existingGroup != undefined) {
      await db
        .updateTable('wechat_group')
        .set({
          name: groupName,
          wechat_id: wechatId,
          description: groupDescription,
          userId: session.user.id,
        })
        .where('id', '=', id)
        .where('userId', '=', session.user.id)
        .executeTakeFirst();
    } else {
      await db.insertInto('wechat_group').values({
        name: groupName,
        wechat_id: wechatId,
        description: groupDescription,
        userId: session.user.id,
      }).execute();
    }

    return NextResponse.json({ message: 'Group added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding group:', error);
    return NextResponse.json({ message: 'Error adding group' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  try {
    const session = await getAuthSession();
    const result = await db
      .deleteFrom('wechat_group')
      .where('id', '=', Number(id))
      .where('userId', '=', session.user.id)
      .executeTakeFirst();

    if (result) {
      return NextResponse.json({ message: 'Group added successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Group not found'}, { status: 404 });
    }

  } catch (error) {
    console.error('Error deleting group:', error);
    return NextResponse.json({ message: 'Error deleting group' }, { status: 500 });
  }
}
