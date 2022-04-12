import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-virtualized/styles.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App style={{ backgroundColor: "black" }} />
  </React.StrictMode>,
  document.getElementById("root")
);
