import { ImodelJsTestApp } from "./api/IModelJsTestApp";
import ReactDOM = require("react-dom");
import App from "./components/App";
import React = require("react");

// initialize the application
ImodelJsTestApp.startup();

// tslint:disable-next-line:no-floating-promises
ImodelJsTestApp.ready.then(() => {
  // when initialization is complete, render
  ReactDOM.render(
    <App />,
    document.getElementById("root") as HTMLElement,
  );
});