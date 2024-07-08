// app/groups/add/page.tsx
"use client";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from "@/components/ui/button"

import { useState } from 'react';

const AddGroupForm = () => {
  const [groupName, setGroupName] = useState('');
  const [wechatId, setWechatId] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const response = await fetch('/api/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        groupName,
        wechatId,
        groupDescription,
      }),
    });

    if (response.ok) {
      console.log('Group saved successfully!');
    } else {
      console.error('Failed to save group');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='grid w-full max-w-sm items-center gap-6'>
      <div className='gap-3'>
        <Label htmlFor='group-name'>Group Name</Label>
        <Input
          type='text'
          id='group-name'
          placeholder='Enter the name of your group'
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>
      <div className='gap-3'>
        <Label htmlFor='wechat-id'>WeChat ID</Label>
        <Input
          type='text'
          id='wechat-id'
          placeholder='Enter the WeChat ID of a group admin'
          value={wechatId}
          onChange={(e) => setWechatId(e.target.value)}
        />
      </div>
      <div className='gap-3'>
        <Label htmlFor='group-description'>Description</Label>
        <Textarea
          placeholder='Enter a description of your group'
          id='group-description'
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
        />
      </div>
      <Button type='submit' className='button'>Save</Button>
    </form>
  );
};

export default AddGroupForm;
