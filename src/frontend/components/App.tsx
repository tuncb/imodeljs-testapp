import * as React from "react";
import Commander from "./Commander";
import { getCommands, getDescriptions } from "./Commands";
import { AppState } from "./AppState";

export default class App extends React.Component<{}, AppState> {
  public render() {
    return (
      <React.Fragment>
        <Commander
          commands={getCommands(this)}
          descriptions={getDescriptions()}>
        </Commander>
      </React.Fragment>
    );
  }

}