import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from  './store';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <>
      <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
      </BrowserRouter>
  </>,
  document.getElementById('root')
);