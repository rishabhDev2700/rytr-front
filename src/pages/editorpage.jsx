import { useEffect, useState } from 'react'
import NoteEditor from '../components/note-editor'
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../components/auth-hook';
import { motion } from 'motion/react';
import { animation, transition } from '../lib/constants';
import NotFound404 from './notfound';
import { dataAPI } from '../lib/data-api';

export default function EditorPage() {

    const { token } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, []);
    return (
        <motion.div animate={animation} transition={transition} className=' bg-neutral-100 dark:bg-neutral-950 dark:text-white p-2 min-h-screen relative'>
            <NoteEditor />
        </motion.div>
    )
}
