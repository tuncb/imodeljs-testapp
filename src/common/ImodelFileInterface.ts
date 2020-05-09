import { IModelRpcProps, RpcInterface, RpcManager, RpcOperation, RpcRequestTokenSupplier_T } from "@bentley/imodeljs-common";
import { IModelBasicDefinitions } from "./RpcTypes";

const localDeploymentOnly: RpcRequestTokenSupplier_T = () => ({ iModelId: "none", key: "" });

export abstract class ImodelFileInterface extends RpcInterface {
  public static readonly interfaceName = "ImodelFileInterface";
  public static interfaceVersion = "1.0.0";  // The API version of the interface
  public static getClient() { return RpcManager.getClientForInterface(ImodelFileInterface); }

  @RpcOperation.setRoutingProps(localDeploymentOnly)
  public async createIModel(_filename: string): Promise<void> { return this.forward(arguments); }
  public async insertBasicDefinitions(_imodelTokenPropsProps: IModelRpcProps): Promise<IModelBasicDefinitions> { return this.forward(arguments); }
  public async addViewDefinition(_imodelTokenProps: IModelRpcProps, _basicDefinitions: IModelBasicDefinitions, _name: string): Promise<string> { return this.forward(arguments); }
  public async addCircle(_imodelTokenProps: IModelRpcProps, _basicDefinitions: IModelBasicDefinitions, _x: number, _y: number, _z: number, _radius: number): Promise<string> { return this.forward(arguments); }
  public async addSphere(_imodelTokenProps: IModelRpcProps, _basicDefinitions: IModelBasicDefinitions, _x: number, _y: number, _z: number, _radius: number): Promise<string> { return this.forward(arguments); }
  public async deleteElement(_imodelTokenProps: IModelRpcProps, _id: string): Promise<void> { return this.forward(arguments); }
}
