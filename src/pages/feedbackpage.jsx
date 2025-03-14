import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '../components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "../components/ui/card";
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function FeedbackPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [related, setRelated] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSuccessMessage('');
        setErrorMessage('');

        if (!name || !email || !related || !message) {
            setErrorMessage('All fields are required.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, related, message }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            setSuccessMessage('🎉 Thank you for your feedback!');
            setName('');
            setEmail('');
            setRelated('');
            setMessage('');
        } catch (error) {
            setErrorMessage(error.message || 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:w-96 mx-auto my-12 text-center"
        >
            <h1 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                Feedback
            </h1>

            <Card className="p-8 bg-gradient-to-br from-white to-gray-100 dark:from-neutral-800 dark:to-neutral-900 shadow-2xl rounded-3xl border border-gray-200 dark:border-neutral-700 hover:shadow-purple-500/30 transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">I'd Love to Hear From You!</h2>

                <p className="text-lg text-gray-600 dark:text-gray-300">
                    📮 Send your thoughts at{' '}
                    <a
                        className="font-semibold text-green-600 hover:text-green-800 underline hover:no-underline transition-colors duration-200"
                        href="mailto:rishabhdev2700@gmail.com"
                    >
                        rishabhdev2700@gmail.com
                    </a>
                </p>

                <div className="flex items-center justify-center my-6">
                    <span className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 text-white flex items-center justify-center shadow-lg">
                        or
                    </span>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300">
                    📩 Prefer social? DM me on{' '}
                    <a
                        className="font-semibold text-purple-600 hover:text-purple-800 underline hover:no-underline transition-colors duration-200"
                        href="https://www.instagram.com/the.rishabhdev/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        @therishabhdev
                    </a>
                </p>
            </Card>



        </motion.div>
    );
}
