import { useDroppable } from '@dnd-kit/core';
import { Item } from './item';
import { STATUS } from '../../lib/constants';
import {
    Card,
    CardHeader,
    CardDescription,
} from "@/components/ui/card";

export function Column({ id, items = [], color }) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <Card
            style={{ backgroundColor: color }}
            className="border rounded-2xl mr-6 lg:m-2 min-w-64 lg:max-w-96 lg:w-full flex flex-col shadow-md hover:shadow-lg transition-shadow"
        >
            <CardHeader className="py-3 px-5 bg-neutral-100 dark:bg-neutral-800 dark:text-white text-neutral-700 rounded-t-xl shadow-md shadow-black/10 text-lg font-semibold">
                {STATUS[id].text}
            </CardHeader>

            <CardDescription
                ref={setNodeRef}
                className={`min-h-[28rem] max-h-[60vh] overflow-hidden p-3 space-y-3 transition-all border-2 border-dashed rounded-b-xl ${isOver ? 'border-lime-400 bg-lime-50 dark:bg-neutral-800' : 'border-transparent'}`}
            >
                {items.length > 0 ? (
                    items.map((item) => (
                        <Item key={item.id} item={item} />
                    ))
                ) : (
                    <p className="text-center text-neutral-400 dark:text-neutral-500 italic">
                        No items here
                    </p>
                )}
            </CardDescription>
        </Card>
    );
}
