import { redirect } from '@tanstack/react-router';
import { $isAuthenticated } from '@/entities/user';

export const rootRedirect = async () => {
    const isAuthenticated = $isAuthenticated.get();
    const defaultRoute = isAuthenticated ? '/uploads' : '/login';

    throw redirect({
        from: '/',
        to: defaultRoute,
        replace: true,
    });
};
