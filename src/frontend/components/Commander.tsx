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
        {/*
        // @ts-ignore */}
        <Terminal
          color='green'
          backgroundColor='black'
          barColor='black'
          style={{ fontWeight: "bold", fontSize: "1em" }}
          allowTabs={false}
          showActions={false}
          hideTopBar={true}
          watchConsoleLogging={true}
          startState= "open"
          commands={this.props.commands}
          descriptions={this.props.descriptions} // see issue https://github.com/nitin42/terminal-in-react/issues/68
        />
    </React.Fragment>
    )
  }
}