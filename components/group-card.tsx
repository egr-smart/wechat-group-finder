import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { WechatGroup } from '@/lib/db/types';

interface GroupCardProps {
  group: WechatGroup;
  onEdit: (group?: WechatGroup) => void;
  onDelete: (id?: number) => void;
  adminView: boolean;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, onEdit, onDelete, adminView }) => {
  return (
    <Card
      key={group.id}
      className='w-64'
    >
      <CardHeader>
        <CardTitle>{group.name}</CardTitle>
      </CardHeader>
      {adminView && (
        <CardFooter>
          <Button variant="outline" onClick={() => onEdit(group)}>Edit</Button>
          <Button variant="destructive" onClick={() => onDelete(group.id)}>Delete</Button>
        </CardFooter>
      )}
    </Card>
  )
}

export default GroupCard;
