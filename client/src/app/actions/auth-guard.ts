import { redirect } from '@tanstack/react-router';

import { $isAuthenticated, authorizeQueryOptions } from '@/entities/user';
import { queryClient } from '@/shared/api';

interface AuthGuardParams {
    loggedIn: boolean;
    redirectTo: string;
}

export const authGuard = async ({
    loggedIn,
    redirectTo,
}: AuthGuardParams) => {
    let isAuthenticated = $isAuthenticated.get();
    if (isAuthenticated === loggedIn) {
        return;
    }
    
    try {
        await queryClient.fetchQuery(authorizeQueryOptions);
        isAuthenticated = true;
    } catch {
        isAuthenticated = false;
    }

    if (isAuthenticated !== loggedIn) {
        throw redirect({ to: redirectTo });
    }
};
