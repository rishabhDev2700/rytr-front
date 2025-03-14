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
        toast("Card Deleted!")
    }

    async function handleStatusUpdate(s) {
        await dataAPI.updateCardStatus(id, { status: Number(s) })
        update()
        toast("Status Updated!")
    }

    return (
        <Card id={id} className="w-full max-w-sm mx-auto my-4 shadow-lg rounded-2xl bg-slate-50 dark:bg-neutral-900 hover:shadow-xl transition-transform duration-300 hover:scale-[1.02] h-full flex flex-col">
            <div className="flex-1 flex flex-col">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white truncate">
                        {title || "Untitled Card"}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 text-sm min-h-[48px]">
                        {description || "No description provided."}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                    <Select value={status} onValueChange={handleStatusUpdate}>
                        <SelectTrigger className="w-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">Not started</SelectItem>
                            <SelectItem value="1">Pending</SelectItem>
                            <SelectItem value="2">Done</SelectItem>
                            <SelectItem value="3">Halted</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                        <span>📅 Created: {createdOn.toLocaleDateString()}</span>
                        <span>🕒 Updated: {updatedOn.toLocaleDateString()}</span>
                    </div>
                </CardContent>
            </div>

            <CardFooter className="flex justify-between gap-2 pt-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full bg-teal-500 hover:bg-teal-700 text-white gap-2">
                            <Pencil2Icon color="white" /> Edit
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-lg w-5/6">
                        <DialogHeader>
                            <DialogTitle>Edit Card</DialogTitle>
                            <DialogDescription>Update your card details.</DialogDescription>
                        </DialogHeader>
                        <CardForm cardID={id} title={title} description={description} status={status} update={update} />
                    </DialogContent>
                </Dialog>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="w-full bg-rose-600 hover:bg-rose-800 text-white gap-2">
                            <TrashIcon color="white" /> Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action is irreversible and will permanently delete the card.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button className="bg-rose-600 hover:bg-rose-800 text-white gap-2" onClick={handleDelete}>
                                    <TrashIcon /> Confirm Delete
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    )
}
