import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { PlusIcon, } from "@radix-ui/react-icons"
import UserCard from "../components/user-card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import CardForm from "../components/card-form"
import NoteCard from "../components/note-card"
import { Link } from "react-router"
import { useNavigate } from "react-router"
import { useAuth } from "../components/auth-hook"
import { useEffect, useState } from "react"
import { motion } from 'motion/react';
import { animation, transition } from "../lib/constants"
import { dataAPI } from "../lib/data-api"
import { toast } from "sonner"
export default function DashboardPage() {
    const [notes, setNotes] = useState([])
    const [cards, setCards] = useState([])
    let navigate = useNavigate();
    const { token } = useAuth();
    async function fetchCards() {
        const cardsData = await dataAPI.getAllPendingCards();
        setCards(cardsData.cards)
    }
    async function fetchNotes() {
        const notesData = await dataAPI.getAllNotes(4);
        setNotes(notesData.notes)
    }
    async function newNote() {
        await dataAPI.createNote({ title: "", content: "" })
        await fetchNotes()
    }
    useEffect(() => {
        if (!token) {
            navigate("/");
        }

        fetchCards()
        fetchNotes()


    }, []);
    return (
        <motion.main animate={animation} transition={transition} className='min-h-screen w-full bg-neutral-100 dark:bg-black p-2'>
            <h1 className="text-2xl font-semibold p-8">Dashboard</h1>
            <Card className="my-2 mx-1 lg:mx-4">
                <CardHeader className="lg:px-8 grid grid-cols-4 lg:grid-cols-4 items-center">
                    <CardTitle>Pending</CardTitle>
                    <Dialog>
                        <DialogTrigger asChild><Button variant="outline" className="flex col-start-3 lg:col-start-5 w-32"><PlusIcon />New Card</Button></DialogTrigger>
                        <DialogContent className="w-4/5 rounded-xl">
                            <DialogHeader>
                                <DialogTitle>Add a new Card</DialogTitle>
                                <DialogDescription>
                                    Fill the details
                                </DialogDescription>
                            </DialogHeader>
                            <CardForm update={fetchCards} />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 lg:gap-4 p-2 lg:p-6">
                    {
                        cards?.map(c => <UserCard title={c.title} description={c.description} status={`${c.status}`} id={c.id} key={c.id} createdOn={new Date(c.created_at)} updatedOn={new Date(c.updated_at)} update={fetchCards} />)
                    }
                </CardContent>
                <CardFooter className="mt-4">
                    <Link to="cards" className="text-thin underline ml-4">See More</Link>
                </CardFooter>
            </Card>
            <Card className="my-2 mx-1 lg:mx-4">
                <CardHeader className="lg:px-8 grid grid-cols-4 lg:grid-cols-4 items-center">
                    <CardTitle>Notes</CardTitle>
                    <Button className="flex col-start-3 lg:col-start-5 w-32" variant="outline" onClick={newNote} ><PlusIcon />New Note</Button>
                </CardHeader>
                <CardContent className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 lg:gap-4 p-2 lg:p-6">
                    {
                        notes?.map(n => <NoteCard key={n.id} title={n.title} content={n.content} id={n.id} createdOn={new Date()} updatedOn={new Date()} />)
                    }
                </CardContent>
                <CardFooter className="mt-4">
                    <Link to="notes" className="text-thin underline ml-4">See More</Link>
                </CardFooter>
            </Card>
        </motion.main>
    )
}
