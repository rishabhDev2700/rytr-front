import { useEffect, useState } from "react";
import NoteCard from "../components/note-card";
import { Button } from "../components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { motion } from "motion/react";
import { Skeleton } from "../components/ui/skeleton";

import { useNavigate } from "react-router";
import { useAuth } from "../components/auth-hook";
import { animation, transition } from "../lib/constants";
import { dataAPI } from "../lib/data-api";

export default function NotesPage() {
  const { token } = useAuth();
  let navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchNotes() {
    setLoading(true);
    try {
      const notesData = await dataAPI.getAllNotes();
      setNotes(notesData.notes);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchNotes();
  }, []);

  async function newNote() {
    await dataAPI.createNote({ title: "", content: "{}" });
    await fetchNotes();
  }

  return (
    <motion.div
      animate={animation}
      transition={transition}
      className="w-full h-full bg-neutral-100 dark:bg-neutral-950 p-2"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 p-4">
        <h1 className="text-2xl font-semibold">Your Notes</h1>
        <Button className="bg-blue-500 w-full sm:w-auto" onClick={newNote}>
          <PlusIcon color="white" />
          New Note
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 lg:gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-80 m-2 rounded-lg bg-neutral-200 dark:bg-neutral-800"
            />
          ))
          : notes?.map((n) => (
            <NoteCard
              id={n.id}
              key={n.id}
              title={n.title}
              content={n.content}
              createdOn={new Date(n.created_at)}
              updatedOn={new Date(n.updated_at)}
              update={fetchNotes}
            />
          ))}
      </div>
    </motion.div>
  );
}
