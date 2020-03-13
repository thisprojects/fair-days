import React from 'react';
import ReactDOM from 'react-dom';
import FairDays from '../src/App/index.js';
import './App/index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<FairDays />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
