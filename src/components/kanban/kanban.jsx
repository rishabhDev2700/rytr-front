import { useEffect, useState } from 'react';
import { cards, STATUS } from '../../lib/constants';
import { Column } from './column';
import { Item } from './item';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { dataAPI } from '../../lib/data-api';

export default function Kanban({items,update}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  useEffect(() => {
    update()
  }, [])

  const handleDragEnd = async (event) => {
    const cardID = event.active.data.current.id
    const columnID = event.over.id
    await dataAPI.updateCardStatus(cardID, { status: columnID })
    update()
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div className='flex flex-col mr-8 lg:flex-row w-full justify-center'>
        {STATUS.map((s, i) => <Column key={i} id={s.index} items={items} color={s.color} />)}
      </div>
    </DndContext>
  );
}