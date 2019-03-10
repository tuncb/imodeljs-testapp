import * as React from "react";
import { Id64String } from "@bentley/bentleyjs-core";
import { IModelConnection } from "@bentley/imodeljs-frontend";
import Toolbar from "./Toolbar";
import { CustomViewportComponent } from "./CustomViewport";

/** React properties for the viewport component */
export interface Props {
  /** iModel whose contents should be displayed in the viewport */
  imodel: IModelConnection;
  /** View definition to use when the viewport is first loaded */
  viewDefinitionId: Id64String;
}

/** Viewport component for the viewer app */
export default class SimpleViewportComponent extends React.Component<Props> {
  public render() {
    return (
      <div>
        <CustomViewportComponent
          imodel={this.props.imodel}
          viewDefinitionId={this.props.viewDefinitionId}
        />
        <Toolbar />
      </div>
    );
  }
}