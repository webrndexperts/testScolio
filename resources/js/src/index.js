import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import store from './reducers/index'
import i18n from './i18n';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/authContext';
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
    {/* </ToastContainer> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
