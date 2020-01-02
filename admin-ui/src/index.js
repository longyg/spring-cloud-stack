import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import './css/custom-semantic.css';
import Page from './Page'

ReactDOM.render(
    <Page />
    ,
    document.getElementById('root')
);

serviceWorker.unregister();
