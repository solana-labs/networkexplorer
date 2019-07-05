import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App';
import AppV2 from './AppV2';
import * as serviceWorker from './serviceWorker';
import * as EndpointConfig from './EndpointConfig';

async function main() {
  await EndpointConfig.load();
  ReactDOM.render(
    <BrowserRouter>
      {window.location.pathname.includes('rc') ? <AppV2 /> : <App />}
    </BrowserRouter>,
    document.getElementById('root'),
  );
}
main();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
