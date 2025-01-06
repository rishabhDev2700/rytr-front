import { useEffect, useState } from "react";
import NoteCard from "../components/note-card";
import { Button } from "../components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { motion } from 'motion/react';

import { useNavigate } from "react-router";
import { useAuth } from "../components/auth-hook";
import { animation, transition } from "../lib/constants";
import { dataAPI } from "../lib/data-api";
export default function NotesPage() {
  const { token } = useAuth();
  let navigate = useNavigate();
  const [notes, setNotes] = useState([])
  async function fetchNotes() {
    const notesData = await dataAPI.getAllNotes();
    setNotes(notesData.notes)
  }
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchNotes()
  }, []);
  async function newNote() {
    await dataAPI.createNote({ title: "", content: "{}" })
    await fetchNotes()
  }
  return (
    <motion.div animate={animation} transition={transition} className="w-full h-full bg-neutral-100 dark:bg-neutral-950 p-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold p-8">Your Notes</h1>
        <Button className="bg-blue-500 m-8" onClick={newNote}>
          <PlusIcon color="white" />
          New Note
        </Button>
      </div>
      <div className="grid lg:grid-cols-3 xl:grid-cols-4">
        {notes?.map(n => <NoteCard
          id={n.id}
          key={n.id}
          title={n.title}
          content={n.content}
          createdOn={new Date(n.created_at)}
          updatedOn={new Date(n.updated_at)}
          update={fetchNotes}
        />)}
      </div>
    </motion.div>
  );
}
