import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { enableAllPlugins } from 'immer';
import App from './components/App/App';

enableAllPlugins();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
