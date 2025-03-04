import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Separator } from "@/components/ui/separator"
import { CSS } from '@dnd-kit/utilities';
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
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
        <Card ref={setNodeRef} style={itemstyle} {...listeners} {...attributes} className='rounded-lg border bg-white/80  dark:bg-neutral-700 backdrop-blur-md shadow-md z-50 w-full'>
            <CardHeader>
                <CardTitle className='text-xl py-2'>
                    {item.title}
                </CardTitle>
                <CardDescription>
                    {item.description}
                </CardDescription>
            </CardHeader>
            <CardFooter className='text-xs'>
                Created on:{(new Date(item.created_at)).toLocaleString()}
                <br></br>
                Updated on:{(new Date(item.updated_at)).toLocaleString()}
            </CardFooter>
        </Card>
    );
}