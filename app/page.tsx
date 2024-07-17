'use client'
import React, { useEffect, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command"
import GroupCard from '@/components/group-card'; 

import type { WechatGroup } from "@/lib/db/types"

export default function Home() {
  const [groups, setGroups] = useState<WechatGroup[]>([]);

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/groups');
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <main>
      <div className="flex justify-center ">
        <Command className="rounded-lg border shadow-md max-w-md">
          <CommandInput placeholder="Search for a group..." />
        </Command>
      </div>
      <div className='max-w-fit mx-auto'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-6">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              adminView={false}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
