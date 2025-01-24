import React from 'react'
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { EnterIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
import { toast } from 'sonner'

import { Link } from 'react-router'
import { dataAPI } from '../lib/data-api'
import { Separator } from './ui/separator'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function NoteCard({ id, title, content, createdOn, updatedOn, update }) {
    async function handleDelete() {
        await dataAPI.deleteNote(id)
        toast("Deleted Note!")
        update()
    }
    return (
        <Card className="max-w-xs grid item my-4 lg:m-2 shadow-md shadow-black/20 bg-slate-50 dark:bg-neutral-800 dark:text-neutral-200 hover:scale-105 duration-200">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                    {title ? title : "Undefined"}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <Separator className='bg-black/50 dark:bg-white/50' />
                <div className='font-thin text-neutral-500 dark:text-white pt-1 text-xs'>
                    Created on: {createdOn.toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',

                        hour12: true,
                    })}
                </div>
                <div className='font-thin text-neutral-500 dark:text-white pb-1 text-xs'>
                    Last Update: {updatedOn.toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',

                        hour12: true,
                    })}
                </div>
            </CardContent>
            <CardFooter className="m-0 pt-0 flex justify-between px-4">
                <Link to={`/dashboard/editor/${id}`}>
                    <Button className=" bg-indigo-500 hover:bg-indigo-800"><EnterIcon color='white' />Open</Button>
                </Link>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="bg-rose-500 hover:bg-rose-800"><TrashIcon color='white' />Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                card and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild><Button className="bg-rose-500 hover:bg-rose-800" onClick={handleDelete}><TrashIcon color='white' />Delete</Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    )
}
