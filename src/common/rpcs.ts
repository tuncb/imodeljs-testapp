import { RpcInterfaceDefinition, IModelReadRpcInterface, IModelTileRpcInterface, SnapshotIModelRpcInterface, IModelWriteRpcInterface } from "@bentley/imodeljs-common";
import { PresentationRpcInterface } from "@bentley/presentation-common";
import { ImodelFileInterface } from "./ImodelFileInterface";

/**
 * Returns a list of RPCs supported by this application
 */
export default function getSupportedRpcs(): RpcInterfaceDefinition[] {
  return [
    IModelReadRpcInterface,
    IModelWriteRpcInterface,
    IModelTileRpcInterface,
    PresentationRpcInterface,
    SnapshotIModelRpcInterface,
    ImodelFileInterface,
  ];
}
