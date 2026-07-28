// Import the generated route tree
import { routeTree } from '@/generated/routes/routeTree.gen';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import '@/shared/styles/index.css';

// Create a new router instance
const router = createRouter({ routeTree });

// Render the app
const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
);
