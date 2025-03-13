import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";

export function Item({ item, overlay = false }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: item.id,
        data: { id: item.id },
    });

    const itemStyle = !overlay
        ? { transform: CSS.Translate.toString(transform) }
        : {};

    return (
        <Card
            ref={!overlay ? setNodeRef : null}
            style={itemStyle}
            {...(!overlay ? { ...listeners, ...attributes } : {})}
            className={`rounded-2xl border bg-white dark:bg-neutral-800 shadow-md z-50 w-full p-4 transition-transform duration-200 ease-in-out 
                ${overlay ? 'opacity-80 scale-105 shadow-lg border-dashed border-indigo-500' : 'hover:shadow-2xl hover:scale-[1.02]'}`}
        >
            <CardHeader className="p-2">
                <CardTitle className='text-lg font-semibold text-neutral-800 dark:text-white truncate'>
                    {item.title}
                </CardTitle>
                <CardDescription className='text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2'>
                    {item.description}
                </CardDescription>
            </CardHeader>
            <CardFooter className='text-xs text-neutral-400 dark:text-neutral-500 flex flex-col gap-1 mt-2'>
                <span>📅 Created: {(new Date(item.created_at)).toLocaleDateString()}</span>
                <span>🔄 Updated: {(new Date(item.updated_at)).toLocaleDateString()}</span>
            </CardFooter>
        </Card>
    );
}
