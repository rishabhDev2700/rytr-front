import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import CardForm from './card-form'
import { dataAPI } from '../lib/data-api'
export default function UserCard({ id, title, description, status, createdOn, updatedOn, update }) {
    async function handleDelete() {
        await dataAPI.deleteCard(id)
        update()
        toast.error("Deleting Card!")
    }
    async function handleStatusUpdate(s) {
        await dataAPI.updateCardStatus(id, { status: Number(s) })
        update()
        toast("Updating status")
    }
    return (
        <Card className="max-w-xs my-4 lg:m-2 shadow-md shadow-black/20 bg-slate-50 dark:bg-neutral-900 dark:text-neutral-200">
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                <CardDescription className="h-32">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="px-4">
                <Select value={status} onValueChange={handleStatusUpdate}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">Not started</SelectItem>
                        <SelectItem value="1">Pending</SelectItem>
                        <SelectItem value="2">Done</SelectItem>
                        <SelectItem value="3">Halted</SelectItem>
                    </SelectContent>
                </Select>
                <div className='font-thin text-neutral-500 py-4 text-xs flex justify-between'>
                    Created on: {createdOn.toLocaleDateString()} |
                    Updated on: {updatedOn.toLocaleDateString()}
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between m-0 pt-0">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className=" bg-teal-600 hover:bg-teal-800"><Pencil2Icon color='white' />Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit card</DialogTitle>
                            <DialogDescription>
                                Make changes.
                            </DialogDescription>
                        </DialogHeader>
                        <CardForm cardID={id} title={title} description={description} status={status} update={update} />
                    </DialogContent>
                </Dialog>

                <Button className=" bg-red-600 hover:bg-red-800" onClick={handleDelete}><TrashIcon color='white' />Delete</Button>
            </CardFooter>
        </Card>
    )
}
