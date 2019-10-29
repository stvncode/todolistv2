import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from 'styled-components';
import {BrowserRouter} from 'react-router-dom';

import theme from './utils/theme';
import GlobalStyles from './utils/global';

import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme ={theme}>
            <>
                <App />
                <GlobalStyles />
            </>
        </ThemeProvider>
    </BrowserRouter>,    
    document.getElementById('root')
);

