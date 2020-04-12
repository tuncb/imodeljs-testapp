import {
  BentleyCloudRpcManager, ElectronRpcManager, ElectronRpcConfiguration,
  RpcConfiguration, RpcOperation, IModelToken, IModelTileRpcInterface,
  RpcResponseCacheControl, MobileRpcConfiguration, MobileRpcManager,
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
    // Insert a dummy IModelToken parameter in order to use rpc functions without IModelTokenParameters as the first argument
    // This is a requirement that is not mentioned in the docs.
    for (const def of config.interfaces())
      RpcOperation.forEach(def, (operation) => operation.policy.token = (request) => (request.findTokenPropsParameter() || new IModelToken("test", "test", "test", "test", OpenMode.ReadWrite)));
  }
  return config;
}
