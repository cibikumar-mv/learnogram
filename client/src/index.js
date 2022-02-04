import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import App from "./app";
// const store = createStore(reducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
//   <Provider store={store}>
<div>
    <App />
</div>,
//   </Provider>,
  document.getElementById("root")
);
