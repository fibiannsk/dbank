import React from "react";
import ReactDOM from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter } from 'react-router-dom';
//import AdminAccountForm from './pages/AdminAccountForm';
import './index.css';
import Profile from "./pages/customer/Profile";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
