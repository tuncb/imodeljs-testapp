import { RpcInterfaceDefinition, IModelReadRpcInterface, IModelTileRpcInterface, StandaloneIModelRpcInterface, IModelWriteRpcInterface } from "@bentley/imodeljs-common";
import { PresentationRpcInterface } from "@bentley/presentation-common";

/**
 * Returns a list of RPCs supported by this application
 */
export default function getSupportedRpcs(): RpcInterfaceDefinition[] {
  return [
    IModelReadRpcInterface,
    IModelWriteRpcInterface,
    IModelTileRpcInterface,
    PresentationRpcInterface,
    StandaloneIModelRpcInterface,
  ];
}