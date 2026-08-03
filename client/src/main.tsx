import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { App } from '@/app/App';

import '@/shared/styles/index.css';

// Render the app
const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <StrictMode>
        <App/>
    </StrictMode>,
);
