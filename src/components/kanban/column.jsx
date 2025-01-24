import { useState } from 'react';
import { useDroppable, DragOverlay } from '@dnd-kit/core';
import { Item } from './item';
import { STATUS } from '../../lib/constants';
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export function Column(props) {
    const [isDragging, setIsDragging] = useState(false);
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = {
        color: isOver ? 'green' : 'red',
    };

    const items = props.items?.filter(i => i.status === props.id).map(i =>
        <Item key={i.id} id={i.id} item={i} />)
    return (
        <Card style={{ backgroundColor: props.color }} className="border rounded-2xl mr-6 lg:m-2 min-w-64 lg:max-w-96 lg:mx-auto lg:w-full">
            <CardHeader className='py-2 px-4 bg-neutral-100  dark:bg-neutral-800 dark:text-white text-neutral-700 rounded-t-xl shadow-black/40 shadow-inner'>{STATUS[props.id].text}</CardHeader>
            <CardDescription ref={setNodeRef} style={style} className="min-h-96 ">
                {items}

            </CardDescription>
        </Card>
    );
} 