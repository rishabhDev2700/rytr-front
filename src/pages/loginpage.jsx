import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { authAPI } from '../lib/data-api'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react';
import { animation, transition } from '../lib/constants'
import { ModeToggle } from "../components/mode-toggle"
import { useAuth } from '../components/auth-hook'

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const { token, setToken } = useAuth();

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token]);

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    async function handleLoginSubmission(e) {
        e.preventDefault()
        try {
            const response = await authAPI.login(email, password)
            if (response.status === 200) {
                const token = response.data
                localStorage.setItem("token", token.token)
                setToken(token.token)
                toast("Logged in Successfully.")
                navigate('/dashboard')
            }
        }
        catch (err) {
            toast("Invalid Credentials")
        }
    }

    async function handleRegisterSubmission(e) {
        e.preventDefault()
        if (confirmPassword !== password) {
            toast("Passwords didn't match")
            return false
        }
        if (!validatePassword(password)) {
            toast("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.")
            return false
        }
        try {
            const response = await authAPI.register({ first_name: firstName, last_name: lastName, email: email, password: password })
            if (response.status === 200) {
                toast("Signed up Successfully.")
            }
        } catch (error) {
            toast("Something went wrong")
        }
    }

    return (
        <motion.div animate={animation} transition={transition} className='h-screen w-full grid place-content-center relative bg-gray-50 dark:bg-neutral-900 overflow-hidden'>
            <ModeToggle className="absolute top-5 right-12 z-50" />

            {/* Animated Aurora Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 blur-3xl animate-aurora"></div>

            {/* App Heading */}
            <h1 className="absolute top-12 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-white drop-shadow-lg">
                RYTR - Personal Productivity App
            </h1>

            <Tabs defaultValue="login" className="min-w-[360px] absolute left-1/2 -translate-x-1/2 top-52">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <form onSubmit={handleLoginSubmission}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Log into Account</CardTitle>
                                <CardDescription>Enter your credentials</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="@email.com" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" placeholder="*******" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full dark:text-black" type="submit">Login</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>
                <TabsContent value="signup">
                    <form onSubmit={handleRegisterSubmission}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Sign up</CardTitle>
                                <CardDescription>Create a new Account</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" type="text" onChange={(e) => { setFirstName(e.target.value) }} value={firstName} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" type="text" onChange={(e) => { setLastName(e.target.value) }} value={lastName} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="@email.com" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" placeholder="*******" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="confirm-password">Confirm Password</Label>
                                    <Input id="confirm-password" type="password" placeholder="*******" onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full dark:text-black" type="submit">Sign up</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>
            </Tabs>
        </motion.div>
    )
}
