import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import { reducers } from './reducers'
import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material';
import App from './App';
import './index.css';
// const middleware = [thunk];

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const theme = createTheme();


ReactDOM.render(
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
   
    </Provider>,
    document.getElementById('root'));


    // window.__REDUX_DEVTOOL_EXTENSION && window.__REDUX_DEVTOOL_EXTENSION()