import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import App from "./app";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

const store = createStore(reducer, compose(applyMiddleware(thunk)));
ReactDOM.render(
  <ThemeProvider theme={theme}>
  <Provider store={store}>
    <App />


</Provider>
</ThemeProvider>,
  document.getElementById("root")
);
