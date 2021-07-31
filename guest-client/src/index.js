import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import './css/main.css';
import 'normalize.css';
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import dotenv from 'dotenv';
dotenv.config();

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('root')
);
reportWebVitals();
