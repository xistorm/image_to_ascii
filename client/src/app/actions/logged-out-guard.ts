import { redirect } from '@tanstack/react-router';

import { $isAuthenticated } from '@/entities/user';

export const loggedOutGuard = () => {
    const isAuthenticated = $isAuthenticated.get();
    if (isAuthenticated) {
        throw redirect({ to: '/uploads', replace: true });
    }
};
