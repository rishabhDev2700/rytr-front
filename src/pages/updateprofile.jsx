import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { userAPI } from '../lib/data-api';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function UpdateProfile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(true);
    const [submissionloading, setSubmissionLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await userAPI.getProfile();
                setFirstName(response.first_name);
                setLastName(response.last_name);
                setLoading(false);
            } catch (err) {
                toast.error('Failed to load profile data');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionLoading(true)
        try {
            const response = await userAPI.updateProfile({ first_name: firstName, last_name: lastName });
            setFirstName(response.user.first_name)
            setLastName(response.user.last_name)
            toast.success('Profile updated successfully');
        } catch (err) {
            toast.error('Failed to update profile');
        } finally {
            setSubmissionLoading(false)
        }
    };

    return (
        <Card className="max-w-xl mx-auto p-6 mt-10 shadow-md shadow-black/20">
            <CardHeader>
                <CardTitle className="text-2xl">Update Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <CardFooter className="flex justify-end">
                        <Button className="bg-teal-500 hover:bg-teal-700 shadow-md shadow-black/20" type="submit" disabled={submissionloading}>
                            {submissionloading ? 'Updating...' : 'Update Profile'}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}
