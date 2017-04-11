//import * as React from 'react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

// So we can hot reload
declare var require: any;
declare var module: any;

// Cordova device
declare var window: any;

import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import app from './reducers/CombinedReducers'
import theme from './theme'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Needed for onTouchTap
const injectTapEventPlugin = require('react-tap-event-plugin');
try {
  injectTapEventPlugin();
} catch (e) {
  console.log('Already injected tap event plugin');
}


var store: any = null;

export function installStore(createdStore: any) {
  store = createdStore;
}

let devtools: any = window['devToolsExtension'] ? window['devToolsExtension']() : (f:any)=>f;
let middleware = applyMiddleware(thunk);

installStore(middleware(devtools(createStore))(app, {}));

let render = () => {
  var base = document.getElementById('react-app');
  ReactDOM.unmountComponentAtNode(base);
  ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <div>Hello derp</div>
    </MuiThemeProvider>,
    base
  );
}
render();