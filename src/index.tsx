import React from 'react';
import './index.scss';

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
