import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { EnterIcon, TrashIcon } from "@radix-ui/react-icons"
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
        <Card className="w-full max-w-sm mx-auto my-4 shadow-lg rounded-2xl bg-slate-50 dark:bg-neutral-800 hover:shadow-xl transition duration-300 ease-in-out hover:scale-[1.02]">
            <CardHeader>
                <CardTitle className="text-xl font-bold truncate text-gray-800 dark:text-white">
                    {title || "Untitled Note"}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Separator className="my-2 bg-gray-300 dark:bg-gray-600" />
                <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <p>📅 Created: {createdOn.toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    })}</p>
                    <p>🕒 Updated: {updatedOn.toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    })}</p>
                </div>
            </CardContent>

            <CardFooter className="flex justify-between gap-2 pt-4">
                <Link to={`/dashboard/editor/${id}`} className="w-full">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-800 text-white gap-2">
                        <EnterIcon color='white' /> Open
                    </Button>
                </Link>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="w-full bg-rose-600 hover:bg-rose-800 text-white gap-2">
                            <TrashIcon color='white' /> Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your note.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button
                                    className="bg-rose-600 hover:bg-rose-800 text-white gap-2"
                                    onClick={handleDelete}
                                >
                                    <TrashIcon color='white' /> Confirm Delete
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    )
}
