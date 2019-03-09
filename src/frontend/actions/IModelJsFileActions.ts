import { ImodelFileInterface } from "../../common/ImodelFileInterface";
import { RpcManager } from "@bentley/imodeljs-common";

export async function createImodel(filename: string) {
  const iModelJsFileRpc = RpcManager.getClientForInterface(ImodelFileInterface);
  return iModelJsFileRpc.createIModel(filename);
}