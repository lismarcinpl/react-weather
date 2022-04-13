import React from 'react';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
import 'assets/GlobalStyle.scss';
import Root from 'views/Root';

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
