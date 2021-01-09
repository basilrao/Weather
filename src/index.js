import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore,applyMiddleware,combineReducers} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducer"
import otherReducer from "./otherReducer"
import thunk from "redux-thunk";

const masterReducer=combineReducers({
  newcity:reducer,
  otherparam:otherReducer
});
const store=createStore(masterReducer,applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

