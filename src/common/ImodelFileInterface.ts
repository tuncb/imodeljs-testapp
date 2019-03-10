import { RpcManager, RpcInterface, IModelToken } from "@bentley/imodeljs-common";
import { IModelBasicDefinitions } from "./RpcTypes";

export abstract class ImodelFileInterface extends RpcInterface {
  public static version = "1.0.0";  // The API version of the interface
  public static types = () => [IModelToken, IModelBasicDefinitions]; // Types used
  public static getClient() { return RpcManager.getClientForInterface(this); }

  public async createIModel(_filename: string): Promise<void> { return this.forward(arguments); }
  public async insertBasicDefinitions(_iModelToken: IModelToken): Promise<IModelBasicDefinitions> { return this.forward(arguments); }
  public async addViewDefinition(_iModelToken: IModelToken, _basicDefinitions: IModelBasicDefinitions): Promise<string> { return this.forward(arguments); }
}