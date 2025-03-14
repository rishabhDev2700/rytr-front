import { startTransition, useEffect, useOptimistic, useState } from 'react';
import { STATUS } from '../../lib/constants';
import { Column } from './column';
import { Item } from './item';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { dataAPI } from '../../lib/data-api';

export default function Kanban({ items, update }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    update();
  }, []);

  const [optimisticItems, addOptimisticItem] = useOptimistic(
    items,
    (state, newStatus) => {
      return state.map(item =>
        item.id === newStatus.cardID
          ? { ...item, status: newStatus.columnID }
          : item
      );
    }
  );

  const handleDragStart = (event) => {
    const id = event.active.data.current?.id;
    const currentItem = items.find((item) => item.id === id);
    console.log(currentItem)
    setActiveItem(currentItem);
  };

  const handleDragEnd = async (event) => {
    const cardID = event.active.data.current?.id;
    const columnID = event.over?.id;
    setActiveItem(null);
    console.log(columnID)
    console.log(cardID)
    if (cardID && columnID.toString()) {
      const updatedItem = items.find((i) => i.id === cardID);
      updatedItem.status = columnID;
      const otherItems = items.filter((i) => i.id !== cardID);
      startTransition(() => {
        addOptimisticItem([...otherItems, updatedItem]);
      });
      console.log(cardID)
      await dataAPI.updateCardStatus(cardID, { status: columnID });
      update();
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div className="flex flex-col mr-8 lg:flex-row w-full justify-center">
        {STATUS.map((s, i) => (
          <Column
            key={s.index}
            id={s.index}
            items={optimisticItems?.filter((item) => item.status === s.index)}
            color={s.color}
          />
        ))}
      </div>

      <DragOverlay>
        {activeItem ? <Item item={activeItem} overlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
