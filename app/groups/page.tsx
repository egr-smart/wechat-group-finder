'use client'
// pages/index.tsx
import React, { useEffect, useState } from 'react';
import Modal from '@/components/modal';
import { Button } from "@/components/ui/button"
import AddGroupForm from "@/components/add-group-form"
import GroupCard from '@/components/group-card'; 
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"

import type { WechatGroup } from "@/lib/db/types"


const Groups: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groups, setGroups] = useState<WechatGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<WechatGroup | null>(null);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedGroup(null);
    fetchGroups();
  };

  const openModalWithGroup = (group: WechatGroup) => {
    setSelectedGroup(group);
    setIsModalVisible(true);
  };

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/groups');
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const deleteGroup = async (id: number) => {
    const response = await fetch(`/api/groups?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Group deleted successfully!');
      fetchGroups();
    } else {
      console.error('Failed to delete group');
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className='max-w-fit mx-auto'>
      <div className="flex flex-col items-start justify-normal py-2">
        <Button
          onClick={openModal}
        >
          Add group 
        </Button>
        <Modal isVisible={isModalVisible} onClose={closeModal} title="Add Group">
          <AddGroupForm group={selectedGroup} closeModal={closeModal} />
        </Modal>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-6">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            onEdit={openModalWithGroup}
            onDelete={deleteGroup}
          />
        ))}
      </div>
    </div>
  );
};

export default Groups;
