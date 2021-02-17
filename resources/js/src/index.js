import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import appReducers from './store/reducers/index';
import App from './frontend/components/Home/App';
import serviceWorker from './serviceWorker';
import './index.css';
import axios from 'axios';
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const store = createStore(appReducers, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
	<Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
serviceWorker();
