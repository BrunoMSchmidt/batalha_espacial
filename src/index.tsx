import React from 'react';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { enableAllPlugins } from 'immer';
import App from './components/App/App';

enableAllPlugins();

// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root')!;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    // <React.StrictMode>
        <App />
    // </React.StrictMode>
);
