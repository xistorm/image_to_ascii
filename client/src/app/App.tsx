import { routeTree } from '@/generated/routes/routeTree.gen';
import { queryClient } from '@/shared/api/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';

const router = createRouter({ routeTree });

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} context={{ queryClient }}/>
        </QueryClientProvider>
    );
};
