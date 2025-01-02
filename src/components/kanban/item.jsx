import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Separator } from "@/components/ui/separator"
import { CSS } from '@dnd-kit/utilities';
export function Item({ item, style }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: item.title,
        data: { id: item.id }
    });
    const itemstyle = {
        ...style,
        transform: CSS.Translate.toString(transform),
    }


    return (
        <div ref={setNodeRef} style={itemstyle} {...listeners} {...attributes} className='p-4 rounded-lg border bg-white/80  dark:bg-neutral-700 backdrop-blur-md shadow-md z-50 w-full'>
            <h2 className='text-xl py-2'>
                {item.title}
            </h2>
            <Separator />
            <div className='text-sm py-2'>
                {item.description}
            </div>
            <div className='text-xs py-2'>
                Created on:{(new Date(item.created_at)).toLocaleString()}
                <br></br>
                Updated on:{(new Date(item.updated_at)).toLocaleString()}
            </div>
        </div>
    );
}