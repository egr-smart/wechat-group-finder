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

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  console.log(id);
  try {
    const result = await db
      .deleteFrom('wechat_group')
      .where('id', '=', Number(id))
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
