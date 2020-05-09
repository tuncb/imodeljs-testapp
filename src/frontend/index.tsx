import * as React from "react";
import * as ReactDOM from "react-dom";
import { ImodelJsTestApp } from "./api/IModelJsTestApp";
import App from "./components/App";

(async () => {
  await ImodelJsTestApp.startup();

  await ImodelJsTestApp.ready;
  ReactDOM.render(
    <App />,
    document.getElementById("root") as HTMLElement,
  );
})(); // tslint:disable-line:no-floating-promises
