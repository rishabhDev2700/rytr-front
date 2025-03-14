import { useState } from 'react';
import { useNavigate } from 'react-router';
import { userAPI } from '../lib/data-api';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log({ old_password: oldPassword, new_password: newPassword })
            await userAPI.changePassword(oldPassword, newPassword);
            toast.success('Password changed successfully');
            navigate('/dashboard/profile');
        } catch (err) {
            toast.error('Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="max-w-xl mx-auto p-6 mt-10">
            <CardHeader>
                <CardTitle className="text-2xl">Change Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="oldPassword">Old Password</Label>
                        <Input
                            id="oldPassword"
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <CardFooter className="flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Change Password'}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}
