import { IModelConnection } from "@bentley/imodeljs-frontend";
import { IModelBasicDefinitions } from "../../common/RpcTypes";

export interface AppState {
  iModel?: IModelConnection;
  iModelBasicDefinitions?: IModelBasicDefinitions;
  viewDefinitions: string[];
}