import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import './css/custom-semantic.css';
import Page from './Page'
import { IntlContextProvider, TipContextProvider, IntlContext } from './components/common/context'
import { IntlProvider } from 'react-intl';
import zh_CN from './utils/locale/zh_CN';
import en_US from './utils/locale/en_US';

const messages = {
    'zh': zh_CN,
    'en': en_US
}

const render = (Component) => {
    ReactDOM.render(
        <IntlContextProvider>
            <TipContextProvider>
                <IntlContext.Consumer>
                    {
                        intlCtx => (
                            <IntlProvider locale={intlCtx.lang} messages={messages[intlCtx.lang]}>
                                <Component />
                            </IntlProvider>
                        )
                    }
                </IntlContext.Consumer>
            </TipContextProvider>
        </IntlContextProvider>
        ,
        document.getElementById('root')
    )
}

render(Page)

serviceWorker.unregister();
