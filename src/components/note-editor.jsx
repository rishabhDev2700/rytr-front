import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { dataAPI } from "../lib/data-api";
import { motion } from "motion/react"
import { transition } from "../lib/constants";
import { useDebouncedCallback } from 'use-debounce';
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Link from "@editorjs/link";
import Delimiter from "@editorjs/delimiter";
import EditorJS from '@editorjs/editorjs';
import { useParams } from "react-router";
import {PropagateLoader} from 'react-spinners';
import './../editor.css';


const EDITOR_JS_TOOLS = {
    header: {
        class: Header,
        inlineToolbar: true,
        config: {
            levels: [1, 2, 3],
            defaultLevel: 1,
            placeholder: 'Enter a heading...',
        },
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
    },
    // checkList: CheckList,
    delimiter: Delimiter,
    link: Link,
    list: List,
};





export default function NoteEditor() {
    const { id } = useParams()
    const [note, setNote] = useState({ title: "", content: "" })
    const [loading, setLoading] = useState(false);
    const ref = useRef();
    async function fetchNote() {
        const response = await dataAPI.getNoteById(id)
        const data = JSON.parse(response.note.content)
        setNote({ title: response.note.title, content: data })
        return data
    }
    async function updateTitle(val) {
        setLoading(true)
        setNote(prevNote => ({ ...prevNote, title: val }));
        await dataAPI.updateNote(id, { title: val, content: JSON.stringify(note.content) });
        setLoading(false)
    }
    const debouncedSave = useDebouncedCallback(async (content) => {
        setLoading(true);
        await dataAPI.updateNote(id, { title: note.title, content: JSON.stringify(content) });
        setLoading(false);
    }, 1000);

    useEffect(() => {
        const setup = async () => {
            const content = await fetchNote()
            if (!ref.current) {
                const editor = new EditorJS({
                    theme: "dark",
                    holder: editorblock,
                    data: content,
                    tools: EDITOR_JS_TOOLS,
                    async onChange(api, event) {
                        setLoading(l => true)
                        const data = await api.saver.save()
                        setNote(prevNote => ({ ...prevNote, content: data }));
                        debouncedSave(data);
                        setLoading(l => false)

                    },
                    onReady: () => {
                        const editorElement = document.getElementById('editorjs');
                        editorElement.classList.add('bg-white', 'dark:bg-red-800', 'text-gray-800', 'dark:text-gray-200', 'rounded-lg', 'p-4');
                    },
                });

                ref.current = editor;
            }
        }

        setup()
        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, []);


    return (
        <div className="lg:m-4 transition-all duration-200">
            <input
                value={note.title}
                onChange={e => updateTitle(e.target.value)}
                className="text-4xl my-8 p-2 md:pl-16 lg:pl-24 xl:pl-40 2xl:pl-56 rounded-xl bg-transparent text-neutral-500 focus:text-neutral-800 dark:focus:text-neutral-300 outline-none w-full"
                placeholder="Title of the Note"
            />
            <Separator orientation="horizontal" />
            <div id="editorblock" className="ce-block__content editorjs-toolbar"></div>
            <Separator orientation="horizontal" />

            {loading &&

                <motion.div animate={{ opacity: [0, 100] }} transition={transition} className="absolute bottom-24 right-24 w-44 flex items-center justify-between p-2 font-mono backdrop-blur-sm scale-110 z-50">
                    <PropagateLoader loading={loading} size={10}  color="white"/> <div className="">Saving</div>
                </motion.div>
            }
        </div>
    );
}