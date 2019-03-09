import {
  BentleyCloudRpcManager, ElectronRpcManager, ElectronRpcConfiguration,
  RpcConfiguration, RpcOperation, IModelToken, IModelTileRpcInterface,
  RpcResponseCacheControl, MobileRpcConfiguration, MobileRpcManager,
} from "@bentley/imodeljs-common";
import getSupportedRpcs from "../../common/rpcs";

/**
 * Initializes RPC communication based on the platform
 */
export default function initRpc(): RpcConfiguration {
  let config: RpcConfiguration;
  const rpcInterfaces = getSupportedRpcs();
  if (ElectronRpcConfiguration.isElectron) {
    // initializes RPC for Electron
    config = ElectronRpcManager.initializeClient({}, rpcInterfaces);
  } else if (MobileRpcConfiguration.isMobileFrontend) {
    config = MobileRpcManager.initializeClient(rpcInterfaces);
  } else {
    // initialize RPC for web apps
    const rpcParams = { info: { title: "imodeljs test app", version: "v1.0" }, uriPrefix: "http://localhost:3001" };
    config = BentleyCloudRpcManager.initializeClient(rpcParams, rpcInterfaces);

    // temporary until deployed backend is updated
    RpcOperation.lookup(IModelTileRpcInterface, "getTileContent").policy.allowResponseCaching = () => RpcResponseCacheControl.None;

    // if (!rpcParams.uriPrefix) {
    for (const definition of config.interfaces())
      RpcOperation.forEach(definition, (operation) => operation.policy.token = () => new IModelToken("test", "test", "test", "test"));
    // }
  }
  return config;
}