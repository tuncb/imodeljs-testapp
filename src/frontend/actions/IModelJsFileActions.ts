import { ImodelFileInterface } from "../../common/ImodelFileInterface";
import { RpcManager } from "@bentley/imodeljs-common";
import { IModelConnection } from "@bentley/imodeljs-frontend";
import { OpenMode } from "@bentley/bentleyjs-core";
import { AppState } from "../components/AppState";

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