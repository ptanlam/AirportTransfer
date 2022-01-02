import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import 'normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

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
