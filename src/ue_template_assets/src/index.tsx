import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import '../assets/main.css';
import { HashRouter, Router, BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);