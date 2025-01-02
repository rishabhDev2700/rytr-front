import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CheckIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import { dataAPI } from '../lib/data-api'
import { toast } from 'sonner'
export default function CardForm({ cardID, title, description, status, update }) {
    const [cardTitle, setTitle] = useState(title || "")
    const [cardDescription, setDescription] = useState(description || "")
    const [initialStatus, setInitialStatus] = useState(status || "0")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const validateForm = () => {
        const newErrors = {}

        if (!cardTitle.trim()) {
            newErrors.title = "Title is required."
        }

        if (!cardDescription.trim()) {
            newErrors.description = "Description is required."
        }

        return newErrors
    }

    const handleSubmit = async () => {
        const validationErrors = validateForm()

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setErrors({})
        setIsLoading(true)
        if (!cardID) {
            const response = await dataAPI.createCard({ id: cardID, title: cardTitle, description: cardDescription, status: Number(initialStatus) })
        }
        else {
            const response = await dataAPI.updateCard(cardID, { title: cardTitle, description: cardDescription, status: Number(initialStatus) })
        }

        toast('Card saved successfully!')
        setIsLoading(false)
        update()
    }
    return (
        <div>
            <div className="space-y-1">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={cardTitle}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>
            <div className="space-y-1">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    rows="6"
                    onChange={(e) => setDescription(e.target.value)}
                    value={cardDescription}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
            <div className="space-y-1">
                <Label htmlFor="status">Status</Label>
                <Select value={initialStatus} onValueChange={setInitialStatus}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">Not started</SelectItem>
                        <SelectItem value="1">Pending</SelectItem>
                        <SelectItem value="2">Done</SelectItem>
                        <SelectItem value="3">Halted</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button
                className="mt-4 bg-blue-500 flex items-center justify-center"
                onClick={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? 'Saving...' : (<><CheckIcon color='white' /> Save</>)}
            </Button>
        </div>
    )
}
