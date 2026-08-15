import { $isAuthenticated, authorizeQueryOptions, login, logout } from '@/entities/user';
import { queryClient } from '@/shared/api';

export const authGuard = async () => {
    const isAuthenticated = $isAuthenticated.get();
    if (isAuthenticated) {
        return;
    }

    try {
        const data = await queryClient.fetchQuery(authorizeQueryOptions);
        login(data);
    } catch {
        logout();
    }
};
