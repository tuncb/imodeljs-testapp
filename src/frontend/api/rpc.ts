import {
  BentleyCloudRpcManager, ElectronRpcConfiguration, ElectronRpcManager,
  IModelRpcProps, IModelTileRpcInterface, MobileRpcConfiguration, MobileRpcManager,
  RpcConfiguration, RpcOperation, RpcResponseCacheControl,
} from "@bentley/imodeljs-common";
import getSupportedRpcs from "../../common/rpcs";
import { OpenMode } from "@bentley/bentleyjs-core";

/**
 * Initializes RPC communication based on the platform
 */
export default function initRpc(): RpcConfiguration {
  let config: RpcConfiguration;
  const rpcInterfaces = getSupportedRpcs();
  // Set the development to true in order to use the rpc system without a context.
  // Local imodels don't seem to have context ids which is required by the rpc system
  RpcConfiguration.developmentMode = true;
  if (ElectronRpcConfiguration.isElectron) {
    // initializes RPC for Electron
    config = ElectronRpcManager.initializeClient({}, rpcInterfaces);
  } else if (MobileRpcConfiguration.isMobileFrontend) {
    config = MobileRpcManager.initializeClient(rpcInterfaces);
  } else {
    // initialize RPC for web apps
    const rpcParams = { info: { title: "imodeljs test app", version: "v1.0" }, uriPrefix: "http://localhost:3001" };
    config = BentleyCloudRpcManager.initializeClient(rpcParams, rpcInterfaces);
  }
  return config;
}
