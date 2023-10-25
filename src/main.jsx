import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from "./context/OrderContext";


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
      <ThemeProvider>  
        <AuthProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </AuthProvider> 
      </ThemeProvider>
  </BrowserRouter>
  // </React.StrictMode>
)
