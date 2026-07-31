import { $isAuthenticated } from '@/entities/user';
import { redirect } from '@tanstack/react-router';

interface AuthGuardParams {
    loggedIn: boolean;
    redirectTo: string;
}

export const authGuard = async ({
    loggedIn,
    redirectTo,
}: AuthGuardParams) => {
    const isAuthenticated = $isAuthenticated.get();

    if (isAuthenticated !== loggedIn) {
        throw redirect({ to: redirectTo });
    }
};
