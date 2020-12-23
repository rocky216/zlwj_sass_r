import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react'
import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import store from "./store"
import { HashRouter} from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Index from './views';

moment.locale('zh-cn');

ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <ConfigProvider  locale={zhCN}>
          <Index/>
        </ConfigProvider>
      </HashRouter>
    </Provider>
  ,
  document.getElementById("root")
)
