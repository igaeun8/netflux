import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/animations.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// GitHub Pages 404.html 리다이렉트 처리
// 404.html에서 ?/path 형태로 리다이렉트된 경우 처리
if (window.location.search.includes('?/')) {
  const path = window.location.search.replace('?/', '').replace(/~and~/g, '&');
  window.history.replaceState(null, '', path);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
