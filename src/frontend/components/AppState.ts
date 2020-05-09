import { IModelBasicDefinitions } from "../../common/RpcTypes";
import { IModelRpcProps } from "@bentley/imodeljs-common";

export interface AppState {
  iModelRpcProps?: IModelRpcProps;
  iModelBasicDefinitions?: IModelBasicDefinitions;
  viewDefinitions: string[];
}
