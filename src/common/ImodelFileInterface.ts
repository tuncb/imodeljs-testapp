import { RpcManager, RpcInterface } from "@bentley/imodeljs-common";

export abstract class ImodelFileInterface extends RpcInterface {
  public static version = "1.0.0";  // The API version of the interface
  public static types = () => []; // Types used
  public static getClient() { return RpcManager.getClientForInterface(this); }

  public async createIModel(_filename: string): Promise<void> { return this.forward(arguments); }
}