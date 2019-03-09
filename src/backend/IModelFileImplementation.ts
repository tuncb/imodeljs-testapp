import { RpcInterface, RootSubjectProps } from "@bentley/imodeljs-common";
import { ImodelFileInterface } from "../common/ImodelFileInterface";
import { IModelDb } from "@bentley/imodeljs-backend";

export class ImodelFileImplementation extends RpcInterface implements ImodelFileInterface {
  public async createIModel(filename: string): Promise<void> {

    const rootSubject: RootSubjectProps = {
      name: 'IModelJsTestApp root subject',
      description: 'dummy root subject'
    };


    IModelDb.createStandalone(filename, {rootSubject});
  }

}