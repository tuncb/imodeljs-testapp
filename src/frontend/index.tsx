import * as React from "react";
import * as ReactDOM from "react-dom";
import { ImodelJsTestApp } from "./api/IModelJsTestApp";
import App from "./components/App";

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
