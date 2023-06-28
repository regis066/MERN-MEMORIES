import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { reducers } from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const theme = createTheme();

ReactDOM.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>,
  document.getElementById('root')
);
