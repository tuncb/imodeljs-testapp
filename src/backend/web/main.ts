// tslint:disable:no-console
import * as express from "express";
import { RpcInterfaceDefinition, BentleyCloudRpcManager } from "@bentley/imodeljs-common";
import { IModelJsExpressServer } from "@bentley/imodeljs-backend";

export default async function initialize(rpcs: RpcInterfaceDefinition[]) {
  // tell BentleyCloudRpcManager which RPC interfaces to handle
  const rpcConfig = BentleyCloudRpcManager.initializeImpl({ info: { title: "imodeljs_test_app", version: "v1.0" } }, rpcs);

  const port = Number(process.env.PORT || 3001);
  const app = express();
  const server = new IModelJsExpressServer(app, rpcConfig.protocol);
  await server.initialize(port);
  console.log("RPC backend for simple-viewer-app listening on port " + port);
}