import { authGuard } from '@/app/actions';
import { LoggedLayout } from '@/app/layout/LoggedLayout/LoggedLayout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_logged')({
    component: LoggedLayout,
    beforeLoad: async () => {
        await authGuard({
            loggedIn: true,
            redirectTo: '/login',
        });
    },
});
