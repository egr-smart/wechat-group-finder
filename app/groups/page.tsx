'use client'
// pages/index.tsx
import React, { useState } from 'react';
import Modal from '@/components/modal';
import { Button } from "@/components/ui/button"
import AddGroupForm from "@/components/add-group-form"

const Groups: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Button
        onClick={openModal}
      >
        Add group 
      </Button>
      <Modal isVisible={isModalVisible} onClose={closeModal} title="Add Group">
        <AddGroupForm />
      </Modal>
    </div>
  );
};

export default Groups;
