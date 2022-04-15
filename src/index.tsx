import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

import App from "./components/App/App";

import { enableAllPlugins } from "immer";

enableAllPlugins();

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById("root")
);