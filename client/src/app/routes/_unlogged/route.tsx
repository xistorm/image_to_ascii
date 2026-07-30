import { authGuard } from '@/app/actions';
import { UnloggedLayout } from '@/app/layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_unlogged')({
    component: () => <UnloggedLayout/>,
    beforeLoad: async () => {
        await authGuard({
            loggedIn: false,
            redirectTo: '/',
        });
    },
});
