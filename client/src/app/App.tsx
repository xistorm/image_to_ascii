import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { routeTree } from '@/generated/routes/routeTree.gen';

import { queryClient } from '@/shared/api';

const router = createRouter({
    routeTree,
    context: {
        queryClient,
    },
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            <TanStackRouterDevtools router={router}/>
        </QueryClientProvider>
    );
};
