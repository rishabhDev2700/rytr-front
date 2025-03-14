import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { userAPI } from '../lib/data-api';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await userAPI.getProfile();
                setUser(response);
                console.log(response)
                setLoading(false);
            } catch (err) {
                setError('Failed to load profile data');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) return <Skeleton className="h-60 w-full max-w-2xl mx-auto mt-10" />;
    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

    return (
        <Card className="max-w-2xl mx-auto p-6 mt-10 shadow-md shadow-black/20 dark:bg-neutral-900">
            <CardHeader>
                <CardTitle className="text-2xl">My Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {user && (
                    <>
                        <div className="flex flex-col md:flex-row md:items-center">
                            <label className="w-full md:w-1/3 text-gray-600 dark:text-white/80 font-medium">Email:</label>
                            <span className="text-gray-800 dark:text-white/60">{user.email}</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center">
                            <label className="w-full md:w-1/3 text-gray-600 dark:text-white/80 font-medium">First Name:</label>
                            <span className="text-gray-800 dark:text-white/60">{user.first_name}</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center">
                            <label className="w-full md:w-1/3 text-gray-600 dark:text-white/80 font-medium">Last Name:</label>
                            <span className="text-gray-800 dark:text-white/60">{user.last_name}</span>
                        </div>
                    </>
                )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                <Button asChild variant="default" className="w-full md:w-auto">
                    <Link to="/dashboard/profile/edit">Edit Profile Information</Link>
                </Button>
                <Button asChild variant="secondary" className="w-full md:w-auto border">
                    <Link to="/dashboard/profile/change-password">Change Password</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
