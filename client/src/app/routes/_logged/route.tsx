import { createFileRoute } from '@tanstack/react-router';

import { LoggedLayout } from '@/app/layout/LoggedLayout';
import { loggedInGuard } from '@/app/actions';

export const Route = createFileRoute('/_logged')({
    beforeLoad: loggedInGuard,
    component: LoggedLayout,
});
