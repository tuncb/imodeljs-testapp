import { SnapshotConnection } from "@bentley/imodeljs-frontend";
import { IModelBasicDefinitions } from "../../common/RpcTypes";

export interface AppState {
  iModel?: SnapshotConnection;
  iModelBasicDefinitions?: IModelBasicDefinitions;
  viewDefinitions: string[];
}
