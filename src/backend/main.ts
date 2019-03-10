import { RpcInterfaceDefinition, RpcManager } from "@bentley/imodeljs-common";
import { IModelHost } from "@bentley/imodeljs-backend";
import { app as electron } from "electron";
import getSupportedRpcs from "../common/rpcs";
import { ImodelFileImplementation } from "./IModelFileImplementation";
import { ImodelFileInterface } from "../common/ImodelFileInterface";
import { TestWorld } from "./TestWorld";

IModelHost.startup();

RpcManager.registerImpl(ImodelFileInterface, ImodelFileImplementation);
TestWorld.registerSchema();

// invoke platform-specific initialization
// tslint:disable-next-line:no-floating-promises
(async () => {
  // get platform-specific initialization function
  let init: (rpcs: RpcInterfaceDefinition[]) => void;
  if (electron) {
    init = (await import("./electron/main")).default;
  } else {
    init = (await import("./web/main")).default;
  }
  // get RPCs supported by this backend
  const rpcs = getSupportedRpcs();
  // do initialize
  init(rpcs);
})();
