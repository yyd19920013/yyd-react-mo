import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import {createHashHistory} from 'history';
import {ConnectedRouter,routerMiddleware} from 'react-router-redux';
import {Route} from 'react-router-dom';
import store from 'store';
import App from 'pages/App';
import {htmlFontSize,consoleNull} from 'js/yydjs';
import 'css/index.css';

/*

    createBrowserHistory：支持H5的history Api
    createMemoryHistory：一般React Native会支持这样的history
    createHashHistory：支持旧浏览器的hash history Api
*/
export const browser=createHashHistory();
export const middleware=routerMiddleware(browser);

htmlFontSize();//改变根节点字体大小
if(window.location.hostname!=='localhost')consoleNull(['log']);//线上禁止用控制台输出

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={browser}>
            <Route path='/' component={App} />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
