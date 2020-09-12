import React from 'react';
import ReactDOM from 'react-dom';

// Containers
import App from './containers/App/App';

// Fonts
import './assets/fonts/Inconsolata-Bold.ttf';
import './assets/fonts/Inconsolata-Medium.ttf';
import './assets/fonts/Inconsolata-Regular.ttf';

// Global Style
import './assets/style/index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
);
