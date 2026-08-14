import { createFileRoute, Navigate } from '@tanstack/react-router';

import { authGuard } from '@/app/actions';
import { LoggedLayout } from '@/app/layout/LoggedLayout/LoggedLayout';

export const Route = createFileRoute('/_logged')({
    component: LoggedLayout,
    notFoundComponent: () => <Navigate to={'/uploads'} replace/>,
    beforeLoad: async () => {
        await authGuard({
            loggedIn: true,
            redirectTo: '/login',
        });
    },
});
