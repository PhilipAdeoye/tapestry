import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./index.css";
import "./responsive.css";
import "./typography.css";
import App from "./app/App";
import store from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { HashRouter } from "react-router-dom";
import ScrollToTop from "./app/ScrollToTop";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <ScrollToTop />
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
