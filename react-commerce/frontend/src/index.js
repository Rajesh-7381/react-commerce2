import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import store from './user/Account/redux/store'
import store2 from './Pratice/store'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store2}>
    <React.StrictMode>
    
        <Auth0Provider domain={process.env.REACT_APP_API_DOMAIN}
        clientId={process.env.REACT_APP_API_CLIENTID}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}>
            <App />
        </Auth0Provider>
    
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
