import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import "react-s-alert/dist/s-alert-default.css";
import "react-toggle/style.css";
import "./css/style.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import HttpsRedirect from "react-https-redirect";
import Alert from "react-s-alert";

import App from "./components/App";
import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <HttpsRedirect>
      <App />
      <Alert stack={{ limit: 3 }} />
    </HttpsRedirect>
  </Provider>,
  document.getElementById("root")
);
