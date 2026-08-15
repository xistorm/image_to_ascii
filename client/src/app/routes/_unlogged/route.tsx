import { createFileRoute } from '@tanstack/react-router';

import { UnloggedLayout } from '@/app/layout/UnloggedLayout';
import { loggedOutGuard } from '@/app/actions';

export const Route = createFileRoute('/_unlogged')({
    component: UnloggedLayout,
    beforeLoad: loggedOutGuard,
});
