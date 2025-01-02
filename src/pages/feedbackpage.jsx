import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '../components/ui/separator'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card } from "../components/ui/card"

export default function FeedbackPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [related, setRelated] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Clear previous messages
        setSuccessMessage('')
        setErrorMessage('')

        // Simple validation
        if (!name || !email || !related || !message) {
            setErrorMessage('All fields are required.')
            return
        }

        setLoading(true)

        try {
            // Example API call to submit the feedback
            // Replace with your actual API endpoint
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    related,
                    message,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to submit feedback')
            }

            setSuccessMessage('Thank you for your feedback!')
            // Reset the form after submission
            setName('')
            setEmail('')
            setRelated('')
            setMessage('')
        } catch (error) {
            setErrorMessage(error.message || 'Something went wrong. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='lg:w-96 lg:mx-auto my-12 text-center'>
            <h1 className="text-4xl m-4">Feedback</h1>
            <div className='my-12 mr-4'>
                <Card className='p-4 text-2xl shadow-lg shadow-black/30'>
                    <div className="my-4">

                        Kindly send your feedback to <a className='text-green-800 hover:text-green-950 underline animate-pulse text-xl' href="mailto:rishabhdev2700@gmail.com"> rishabhdev2700@gmail.com</a>
                    </div>
                    <div className="flex justify-center items-center overflow-hidden">
                        <Separator />
                        Or<Separator />
                    </div>
                    <div className="my-4">
                        DM <a className='text-purple-600 hover:text-purple-900 animate-pulse underline' href="https://www.instagram.com/the.rishabhdev/" target='_blank'>@therishabhdev</a>
                    </div>
                </Card>
            </div>
        </div>
    )
}
