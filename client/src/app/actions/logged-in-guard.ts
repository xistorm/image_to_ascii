import { redirect } from '@tanstack/react-router';

import { $isAuthenticated } from '@/entities/user';

export const loggedInGuard = () => {
    const isAuthenticated = $isAuthenticated.get();
    if (!isAuthenticated) {
        throw redirect({ to: '/login', replace: true });
    }
};
