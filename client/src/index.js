import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './il8n';

ReactDOM.render(
    <Suspense fallback='Loading...'>
    <App />
    </Suspense>,
  document.getElementById('root')
);

