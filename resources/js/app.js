import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App';
import ReactDOM from 'react-dom/client';
import './src/index.css';
import reportWebVitals from './src/reportWebVitals';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import store from './src/reducers/index'
import i18n from './src/i18n';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './src/context/authContext';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
