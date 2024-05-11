import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import '@splidejs/splide/css';
import "./css/animations.css"
import "./css/scrollbar.css"
// import "./css/loco-scroll.scss"
import "./javascripts/event.js"
import Aos from 'aos';
import 'aos/dist/aos.css';
Aos.init();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
