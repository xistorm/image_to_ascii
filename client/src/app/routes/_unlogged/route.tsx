import { createFileRoute, Navigate } from '@tanstack/react-router';

import { authGuard } from '@/app/actions';
import { UnloggedLayout } from '@/app/layout';
import { LoaderWrapper } from '@/features/LoaderWrapper';

export const Route = createFileRoute('/_unlogged')({
    component: UnloggedLayout,
    notFoundComponent: () => <Navigate to={'/login'} replace/>,
    pendingComponent: LoaderWrapper,
    beforeLoad: async () => {
        await authGuard({
            loggedIn: false,
            redirectTo: '/uploads',
        });
    },
});
