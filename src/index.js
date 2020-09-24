import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './reducers';

// Containers
import App from './components/App/App';

// Fonts
import './assets/fonts/Inconsolata-Bold.ttf';
import './assets/fonts/Inconsolata-Medium.ttf';
import './assets/fonts/Inconsolata-Regular.ttf';

// Global Style
import './assets/style/main.less';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('app'),
);
