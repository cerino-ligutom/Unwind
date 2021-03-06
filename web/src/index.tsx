import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ModalProvider } from 'react-modal-hook';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ModalProvider>
      <App />
    </ModalProvider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
