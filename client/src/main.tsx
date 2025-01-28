import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

import { App } from './routes/App.tsx';

import '@assets/styles/fonts.css';
import '@assets/styles/palette.css';
import '@assets/styles/common.css';


const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
