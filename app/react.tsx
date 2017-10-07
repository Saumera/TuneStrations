//import * as React from 'react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

// So we can hot reload
declare var require: any;
declare var module: any;

// Cordova device
declare var window: any;
declare var paper: any;


import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import app from './reducers/CombinedReducers'
import theme from './theme'

import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MidiWriter from './theory/duckpunch'

import MainContainer from './components/MainContainer'

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
    <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <MainContainer />
    </MuiThemeProvider>
    </Provider>,
    base
  );
}
render();
