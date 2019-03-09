import * as React from "react";
import Commander from "./Commander";
import { getCommands, getDescriptions } from "./Commands";

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <React.Fragment>
        <Commander
          commands={getCommands()}
          descriptions={getDescriptions()}>
        </Commander>
      </React.Fragment>
    );
  }

}