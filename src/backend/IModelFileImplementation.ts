import { RpcInterface, RootSubjectProps, IModel, GeometricElement3dProps, IModelToken, Code } from "@bentley/imodeljs-common";
import { ImodelFileInterface } from "../common/ImodelFileInterface";
import { IModelDb, Subject, DefinitionModel, PhysicalModel, DisplayStyle3d, ModelSelector, CategorySelector, OrthographicViewDefinition } from "@bentley/imodeljs-backend";
import { ActivityLoggingContext } from "@bentley/bentleyjs-core";
import { Circle } from "./CircleElement";
import { TestWorld } from "./TestWorld";
import { IModelBasicDefinitions } from "../common/RpcTypes";
import { Range3d, YawPitchRollAngles, Point3d } from "@bentley/geometry-core";
import { SphereElement } from "./SphereElement";

export class ImodelFileImplementation extends RpcInterface implements ImodelFileInterface {
  public async deleteElement(iModelToken: IModelToken, id: string): Promise<void> {
    const iModel = IModelDb.find(iModelToken);
    iModel.elements.deleteElement(id);
  }
  public async addCircle(iModelToken: IModelToken,  basicDefinitions: IModelBasicDefinitions, x: number, y: number, z: number, radius: number): Promise<string> {
    const iModel = IModelDb.find(iModelToken);
    const location = new Point3d(0, 0, 0);
    const geom = Circle.generateGeometry(x, y, z, radius);

    const name = `Circle-${x}-${y}-${z}-${radius}`;

    const props: GeometricElement3dProps = {
      model: basicDefinitions.spatialModelId,
      code: Code.createEmpty(),
      classFullName: TestWorld.Class.Circle,
      category: Circle.getCategory(iModel).id,
      geom: geom,
      placement: { origin: location, angles: new YawPitchRollAngles() },
      name: name
    };

    return iModel.elements.insertElement(props);
  }

  public async addSphere(iModelToken: IModelToken, basicDefinitions: IModelBasicDefinitions, x: number, y: number, z: number, radius: number): Promise<string> {
    const iModel = IModelDb.find(iModelToken);
    const location = new Point3d(0, 0, 0);
    const geom = SphereElement.generateGeometry(x, y, z, radius);

    const name = `Sphere-${x}-${y}-${z}-${radius}`;

    const props: GeometricElement3dProps = {
      model: basicDefinitions.spatialModelId,
      code: Code.createEmpty(),
      classFullName: TestWorld.Class.SphereElement,
      category: SphereElement.getCategory(iModel).id,
      geom: geom,
      placement: { origin: location, angles: new YawPitchRollAngles() },
      name: name
    };

    return iModel.elements.insertElement(props);
  }

  public async addViewDefinition(iModelToken: IModelToken, basicDefinitions: IModelBasicDefinitions, name: string): Promise<string> {
    const iModel = IModelDb.find(iModelToken);
    const viewRange = new Range3d(-10, -10, -10, 10, 10, 10);

    const displayStyleId = DisplayStyle3d.insert(iModel, basicDefinitions.definitionModelId, name);

    return OrthographicViewDefinition.insert(iModel,
      basicDefinitions.definitionModelId, name,
      basicDefinitions.modelSelectorId, basicDefinitions.categorySelectorId,
      displayStyleId, viewRange
    );
  }
  public async insertBasicDefinitions(iModelToken: IModelToken): Promise<IModelBasicDefinitions> {
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
    const spatialCategoryIds = [Circle.getCategory(iModel).id, SphereElement.getCategory(iModel).id];
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