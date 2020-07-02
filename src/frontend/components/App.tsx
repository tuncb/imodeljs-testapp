import * as React from "react";
import Commander from "./Commander";
import { getCommands, getDescriptions } from "./Commands";
import { AppState } from "./AppState";
// import SimpleViewportComponent from "./Viewport";

import "./App.scss";

export default class App extends React.Component<{}, AppState> {
  constructor(props?: any, context?: any) {
    super(props, context);
    this.state = {
      iModelRpcProps: undefined,
      iModelBasicDefinitions: undefined,
      viewDefinitions: [],
    };
  }

  public getIModelJsView(): JSX.Element {
    if (this.state.iModelRpcProps && this.state.iModelBasicDefinitions && this.state.viewDefinitions.length > 0) {
      return (
        // <React.Fragment>
        //   <SimpleViewportComponent imodel={this.state.iModel} viewDefinitionId={this.state.viewDefinitions[this.state.viewDefinitions.length - 1]} />
        // </React.Fragment>
        <h1>No view is loaded</h1>
      );
    } else {
      return (
        <h1>No view is loaded</h1>
      );
    }
  }

  public render() {
    return (
      <div className="app">
        <div className="view">
          {this.getIModelJsView()}
        </div>
        <div className="terminal">
          <Commander
            commands={getCommands(this)}
            description={getDescriptions()}>
          </Commander>
        </div>
      </div>
    );
  }

}
