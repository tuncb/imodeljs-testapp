import { ImodelFileInterface } from "../../common/ImodelFileInterface";
import { RpcManager } from "@bentley/imodeljs-common";
import { IModelConnection } from "@bentley/imodeljs-frontend";
import { OpenMode } from "@bentley/bentleyjs-core";
import { AppState } from "../components/AppState";
import { Newton1dUnboundedApproximateDerivative } from "@bentley/geometry-core";

export async function createImodel(filename: string) {
  const iModelJsFileRpc = RpcManager.getClientForInterface(ImodelFileInterface);
  return iModelJsFileRpc.createIModel(filename);
}

export async function openIModel(app: React.Component<{}, AppState>, filename: string): Promise<void> {
  const iModel = await IModelConnection.openStandalone(filename, OpenMode.ReadWrite);
  app.setState({iModel});
}

export async function closeIModel(app: React.Component<{}, AppState>): Promise<void> {
  if (app.state.iModel) {
    return app.state.iModel.closeStandalone();
  } else throw new Error('No opened imodel exist.');
}

export async function insertDefinitions(app: React.Component<{}, AppState>): Promise<void> {
  const iModelJsFileRpc = RpcManager.getClientForInterface(ImodelFileInterface);
  if (app.state.iModel) {
    const basicDefinitions = await iModelJsFileRpc.insertBasicDefinitions(app.state.iModel.iModelToken);
    app.setState({...app.state, iModelBasicDefinitions: basicDefinitions});
  } else throw new Error('No opened imodel exist.');
}

export async function addViewDefinition(app: React.Component<{}, AppState>): Promise<void> {
  const iModelJsFileRpc = RpcManager.getClientForInterface(ImodelFileInterface);
  if (app.state.iModel && app.state.iModelBasicDefinitions) {
    const viewDefinition = await iModelJsFileRpc.addViewDefinition(app.state.iModel.iModelToken, app.state.iModelBasicDefinitions);

    const currentDefinitions = app.state.viewDefinitions;
    currentDefinitions.push(viewDefinition);
    app.setState({...app.state, viewDefinitions: currentDefinitions});
  } else throw new Error('could not find basic definitions in the imodel');
}

export async function addCircle(app: React.Component<{}, AppState>, x: number, y: number, z: number, radius: number): Promise<void> {
  const iModelJsFileRpc = RpcManager.getClientForInterface(ImodelFileInterface);

  if (app.state.iModel && app.state.iModelBasicDefinitions) {
    await iModelJsFileRpc.addCircle(app.state.iModel.iModelToken, app.state.iModelBasicDefinitions, x, y, z, radius);
  } else throw new Error('could not find basic definitions in the imodel');
}