import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import './index.css';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { processResult } from 'immer/dist/internal';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
