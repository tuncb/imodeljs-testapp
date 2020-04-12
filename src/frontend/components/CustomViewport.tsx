import * as React from "react";
import { Id64String, BeDuration } from "@bentley/bentleyjs-core";
import {
  IModelApp,
  IModelConnection,
  ViewState,
  ScreenViewport,
  Viewport,
} from "@bentley/imodeljs-frontend";

import { Transform } from "@bentley/geometry-core";
import { ViewportComponentEvents, CubeRotationChangeEventArgs, StandardRotationChangeEventArgs } from "@bentley/ui-components";

/**
 * Properties for [[ViewportComponent]] component.
 */
export interface ViewportProps {
  /** IModel to display */
  imodel: IModelConnection;
  /** Id of a default view definition to load as a starting point */
  viewDefinitionId?: Id64String;
  /** ViewState to use as a starting point */
  viewState?: ViewState;
  /** Function to get a reference to the ScreenViewport */
  viewportRef?: (v: ScreenViewport) => void;
  /** @hidden */
  onContextMenu?: (e: React.MouseEvent) => boolean;
}

/**
 * A viewport React component that creates a ScreenViewport.
 */
export class CustomViewportComponent extends React.Component<ViewportProps> {

  private _viewportDiv: React.RefObject<HTMLDivElement>;
  private _vp?: ScreenViewport;
  private _viewClassFullName: string = "";
  private _viewId: string = "";

  public constructor(props: ViewportProps, context?: any) {
    super(props, context);
    this._viewportDiv = React.createRef<HTMLDivElement>();
    // tslint:disable-next-line: no-console
    console.log("constructor");
  }

  public async componentDidMount() {
    // tslint:disable-next-line: no-console
    console.log("componentDidMount");
    if (!this._viewportDiv.current)
      throw new Error("Parent <div> failed to load");

    let viewState: ViewState;
    if (this.props.viewState) {
      viewState = this.props.viewState;
    } else if (this.props.viewDefinitionId) {
      viewState = await this.props.imodel.views.load(this.props.viewDefinitionId);
      if (!viewState)
        throw new Error("View state failed to load");
    } else {
      throw new Error("Either viewDefinitionId or viewState must be provided as a ViewportComponent Prop");
    }

    this._vp = ScreenViewport.create(this._viewportDiv.current, viewState);
    IModelApp.viewManager.addViewport(this._vp);

    if (this.props.viewportRef)
      this.props.viewportRef(this._vp);

    ViewportComponentEvents.initialize();
    ViewportComponentEvents.onCubeRotationChangeEvent.addListener(this._handleCubeRotationChangeEvent, this);
    ViewportComponentEvents.onStandardRotationChangeEvent.addListener(this._handleStandardRotationChangeEvent, this);

    this._vp.onViewChanged.addListener(this._handleViewChanged, this);
    this._viewClassFullName = this._vp.view.classFullName;
    this._viewId = this._vp.view.id;
  }

  public componentWillUnmount() {
    // tslint:disable-next-line: no-console
    console.log("componentWillUnmount");
    if (this._vp) {
      IModelApp.viewManager.dropViewport(this._vp, true);
      this._vp.onViewChanged.removeListener(this._handleViewChanged, this);
    }

    ViewportComponentEvents.onCubeRotationChangeEvent.removeListener(this._handleCubeRotationChangeEvent, this);
    ViewportComponentEvents.onStandardRotationChangeEvent.removeListener(this._handleStandardRotationChangeEvent, this);
  }

  private _handleCubeRotationChangeEvent = (args: CubeRotationChangeEventArgs) => {
    this.setState({ rotMatrix: args.rotMatrix });
  }

  private _handleStandardRotationChangeEvent = (args: StandardRotationChangeEventArgs) => {
    if (this._vp && IModelApp.viewManager.selectedView === this._vp) {
      // this._vp.view.setStandardRotation(args.standardRotation);
      this._vp.view.setRotationAboutPoint(ViewState.getStandardViewMatrix(args.standardRotation));
      this._vp.synchWithView(true);
    }
  }

  private _handleViewChanged = (vp: Viewport) => {
    ViewportComponentEvents.setViewMatrix(vp);

    if (this._viewClassFullName !== vp.view.classFullName) {
      setTimeout(() => {
        ViewportComponentEvents.onViewClassFullNameChangedEvent.emit({ viewport: vp, oldName: this._viewClassFullName, newName: vp.view.classFullName });
        this._viewClassFullName = vp.view.classFullName;
      });
    }

    if (this._viewId !== vp.view.id) {
      setTimeout(() => {
        ViewportComponentEvents.onViewIdChangedEvent.emit({ viewport: vp, oldId: this._viewId, newId: vp.view.id });
        this._viewId = vp.view.id;
      });
    }
  }

  private _handleContextMenu = (e: React.MouseEvent): boolean => {
    e.preventDefault();
    if (this.props.onContextMenu)
      this.props.onContextMenu(e);
    return false;
  }

  public render() {
    return (
      <div
        ref={this._viewportDiv}
        onContextMenu={this._handleContextMenu}
      />
    );
  }
}
