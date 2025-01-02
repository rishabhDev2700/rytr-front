import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { dataAPI } from "../lib/data-api";
import { LoaderPinwheelIcon } from "lucide-react";
import { motion } from "motion/react"
import { transition } from "../lib/constants";
import { useDebouncedCallback } from 'use-debounce';
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Link from "@editorjs/link";
import Delimiter from "@editorjs/delimiter";
import CheckList from "@editorjs/checklist";
import EditorJS from '@editorjs/editorjs';
import { useParams } from "react-router";



const EDITOR_JS_TOOLS = {
    header: Header,
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
        const data = JSON.parse (response.note.content)
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
                    holder: editorblock,
                    data: content,
                    tools: EDITOR_JS_TOOLS,
                    async onChange(api, event) {
                        setLoading(l=>true)
                        const data = await api.saver.save()
                        setNote(prevNote => ({ ...prevNote, content: data }));
                        debouncedSave(data);
                        setLoading(l => false)

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
        <div className="lg:m-4">
            <input
                value={note.title}
                onChange={e => updateTitle(e.target.value)}
                className="text-4xl my-8 p-2 rounded-xl bg-transparent text-neutral-500 focus:text-neutral-800 dark:focus:text-neutral-300 outline-none w-full"
                placeholder="Title of the Note"
            />
            <div id="editorblock" className=""></div>
            <Separator orientation="horizontal" />
            {loading &&

                <motion.div animate={{ opacity: [0, 100] }} transition={transition} className="absolute bottom-24 right-24 w-min flex items-center justify-between p-2 font-mono backdrop-blur-sm scale-110 z-50">
                    <LoaderPinwheelIcon className="animate-spin" /> <div className="ml-2">Saving</div>
                </motion.div>
            }
        </div>
    );
}