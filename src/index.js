import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './redux/store';

// console.log(store.getState());

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>, document.querySelector('#root'));