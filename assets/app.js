/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<App tab="home" />);
