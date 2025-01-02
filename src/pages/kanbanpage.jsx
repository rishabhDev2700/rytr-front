import { useEffect, useState } from "react";
import Kanban from "../components/kanban/kanban";

import { useNavigate } from "react-router";
import { useAuth } from "../components/auth-hook";
import { motion } from 'motion/react';
import { animation, transition } from "../lib/constants";
import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogContent, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons";
import CardForm from "../components/card-form";
import { dataAPI } from "../lib/data-api";

export default function KanbanPage() {
  const { token } = useAuth();
  let navigate = useNavigate();
  const [items, setitems] = useState([]);

  async function fetchCards() {
    const data = await dataAPI.getAllCards();
    setitems(data.cards)
  }
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <motion.div animate={animation} transition={transition}>
      <div className="flex items-center justify-between mr-8">
        <h1 className="text-2xl font-semibold p-8">KanbanBoard</h1>
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
      </div>
      <Kanban items={items} update={fetchCards} />
    </motion.div>
  );
}
