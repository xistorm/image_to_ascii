import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';

import { RootLayout } from '@/app/layout/RootLayout';
import { authGuard } from '@/app/actions';
import { NotFound } from '@/pages/NotFound';
import { LoaderWrapper } from '@/shared/components/LoaderWrapper';

interface RootRouterContext {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootRouterContext>()({
    beforeLoad: authGuard,
    component: RootLayout,
    notFoundComponent: NotFound,
    pendingComponent: LoaderWrapper,
});
