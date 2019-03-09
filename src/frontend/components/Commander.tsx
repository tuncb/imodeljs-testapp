import * as React from "react";
import Terminal from 'terminal-in-react';

interface CommanderProps {
  commands: any;
  descriptions: any;
}

export default class Commander extends React.Component<CommanderProps> {
  public render() {
    return (
      <React.Fragment>
      <Terminal
        color='green'
        backgroundColor='black'
        barColor='black'
        style={{ fontWeight: "bold", fontSize: "1em" }}
        allowTabs={false}
        showActions={false}
        hideTopBar={true}
        watchConsoleLogging={true}
        commands={this.props.commands}
        description={this.props.descriptions}
      />
    </React.Fragment>
    )
  }
}