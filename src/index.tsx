import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root'); // מזהה את אלמנט ה-root

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement); // מוודא שהאלמנט הוא HTMLElement
  root.render(
    <React.StrictMode>
    <App />
    </React.StrictMode>
  );
}
