import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Navigate } from '@tanstack/react-router';

import { RootLayout } from '@/app/layout';
import { LoaderWrapper } from '@/features/LoaderWrapper';

interface RootRouterContext {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootRouterContext>()({
    component: RootLayout,
    notFoundComponent: () => <Navigate to={'/login'} replace/>,
    pendingComponent: LoaderWrapper,
});
