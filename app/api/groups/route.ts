import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/db';

export async function PUT(req: NextRequest) {
  const { id, groupName, wechatId, groupDescription } = await req.json();

  try {
    const existingGroup = await db
      .selectFrom('wechat_group')
      .select('id')
      .where('id', '=', id)
      .executeTakeFirst();

    console.log(existingGroup);

    if (existingGroup != undefined) {
      await db
        .updateTable('wechat_group')
        .set({
          name: groupName,
          wechat_id: wechatId,
          description: groupDescription,
        })
        .where('id', '=', id)
        .executeTakeFirst();
    } else {
      await db.insertInto('wechat_group').values({
        name: groupName,
        wechat_id: wechatId,
        description: groupDescription,
      }).execute();
    }

    return NextResponse.json({ message: 'Group added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding group:', error);
    return NextResponse.json({ message: 'Error adding group' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const groups = await db.selectFrom('wechat_group')
                          .selectAll()
                          .execute();

    return NextResponse.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 });
  }
}

