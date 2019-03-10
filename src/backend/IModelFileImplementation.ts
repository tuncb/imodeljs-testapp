import { RpcInterface, RootSubjectProps, IModel } from "@bentley/imodeljs-common";
import { ImodelFileInterface } from "../common/ImodelFileInterface";
import { IModelDb, Subject, DefinitionModel, PhysicalModel, DisplayStyle3d, ModelSelector, CategorySelector } from "@bentley/imodeljs-backend";
import { ActivityLoggingContext } from "@bentley/bentleyjs-core";
import { Circle } from "./CircleElement";
import { TestWorld } from "./TestWorld";
import { IModelBasicDefinitions } from "../common/RpcTypes";

export class ImodelFileImplementation extends RpcInterface implements ImodelFileInterface {
  public async insertBasicDefinitions(iModelToken: import("@bentley/imodeljs-common").IModelToken): Promise<IModelBasicDefinitions> {
    const iModel = IModelDb.find(iModelToken);
    const activityContext = new ActivityLoggingContext('insert basic definitions');

    await TestWorld.importSchema(activityContext, iModel);
    iModel.saveChanges();

    const jubSubjectId = Subject.insert(iModel, IModel.rootSubjectId, "RobotWorld"); // Job subject name must be unique among job subjects
    const definitionModelId = DefinitionModel.insert(iModel, jubSubjectId, "definitions");

    const spatialModelId = PhysicalModel.insert(iModel, jubSubjectId, "spatial model 1");

    // 3. Create views.
    //    Note that the view definition and helper objects go into the definition model, not the spatial model.
    //    Note how Element IDs are captured as strings.
    const viewName = "Test Robot View";
    const modelSelectorId = ModelSelector.insert(iModel, definitionModelId, viewName, [spatialModelId]);
    const spatialCategoryIds = [Circle.getCategory(iModel).id];
    const categorySelectorId = CategorySelector.insert(iModel, definitionModelId, viewName, spatialCategoryIds);
    const displayStyleId = DisplayStyle3d.insert(iModel, definitionModelId, viewName);

    iModel.saveChanges();

    return {
      jubSubjectId,
      definitionModelId,
      spatialModelId,
      modelSelectorId,
      categorySelectorId,
      displayStyleId,
      viewName
    };
  }
  public async createIModel(filename: string): Promise<void> {

    const rootSubject: RootSubjectProps = {
      name: 'IModelJsTestApp root subject',
      description: 'dummy root subject'
    };


    const iModel = IModelDb.createStandalone(filename, {rootSubject});
    iModel.closeStandalone();
  }

}