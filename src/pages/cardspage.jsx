import React, { useEffect, useState } from "react";
import UserCard from "../components/user-card";

import { useNavigate } from "react-router";
import { useAuth } from "../components/auth-hook";
import { dataAPI } from "../lib/data-api";
import { motion } from 'motion/react';
import { animation, transition } from "../lib/constants";
import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogContent, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons";
import CardForm from "../components/card-form";
export default function CardsPage() {
  const { token } = useAuth();
  let navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });
  const [cards, setCards] = useState([]);
  const data = cards?.map((c) => (
    <UserCard
      key={c.id}
      id={c.id}
      title={c.title}
      description={c.description}
      status={`${c.status}`}
      createdOn={new Date(c.created_at)}
      updatedOn={new Date(c.updated_at)}
      update={fetchCards}
    />
  ));
  async function fetchCards() {
    const data = await dataAPI.getAllCards();
    setCards(data.cards)
  }
  useEffect(() => {
    fetchCards();
  }, []);
  return (
    <motion.div animate={animation} transition={transition} className="w-full h-full bg-neutral-100 dark:bg-neutral-950 p-2">
      <div className="flex items-center justify-between mr-8">
        <h1 className="text-2xl font-semibold p-8">Your Cards</h1>
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
      <div className="grid lg:grid-cols-6">{data ? data : "No Card to show"}</div>
    </motion.div>
  );
}
