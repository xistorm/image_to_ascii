import { createFileRoute, Navigate } from '@tanstack/react-router';

import { authGuard } from '@/app/actions';
import { LoggedLayout } from '@/app/layout/LoggedLayout/LoggedLayout';
import { LoaderWrapper } from '@/features/LoaderWrapper';

export const Route = createFileRoute('/_logged')({
    component: LoggedLayout,
    notFoundComponent: () => <Navigate to={'/uploads'} replace/>,
    pendingComponent: LoaderWrapper,
    beforeLoad: async () => {
        await authGuard({
            loggedIn: true,
            redirectTo: '/login',
        });
    },
});
