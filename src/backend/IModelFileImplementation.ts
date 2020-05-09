import { Code, GeometricElement3dProps, IModel, IModelRpcProps, RootSubjectProps, RpcInterface } from "@bentley/imodeljs-common";
import { ImodelFileInterface } from "../common/ImodelFileInterface";
import { CategorySelector, DefinitionModel, DisplayStyle3d, IModelDb, ModelSelector, OrthographicViewDefinition, PhysicalModel, StandaloneDb, Subject } from "@bentley/imodeljs-backend";
import { ClientRequestContext, OpenMode } from "@bentley/bentleyjs-core";
import { Circle } from "./CircleElement";
import { TestWorld } from "./TestWorld";
import { IModelBasicDefinitions } from "../common/RpcTypes";
import { Point3d, Range3d, YawPitchRollAngles } from "@bentley/geometry-core";
import { SphereElement } from "./SphereElement";

export class ImodelFileImplementation extends RpcInterface implements ImodelFileInterface {
  public async openIModel(filename: string): Promise<IModelRpcProps> {
    const standaloneDB = StandaloneDb.openFile(filename, OpenMode.ReadWrite);
    return standaloneDB.getRpcProps();
  }

  public async closeIModel(rpcProps: IModelRpcProps): Promise<void> {
    const iModel = StandaloneDb.findByKey(rpcProps.key);
    iModel.saveChanges();
    (iModel as StandaloneDb).close();
  }

  public async deleteElement(rpcProps: IModelRpcProps, id: string): Promise<void> {
    const iModel: IModelDb = IModelDb.findByKey(rpcProps.key);
    iModel.elements.deleteElement(id);
  }
  public async addCircle(rpcProps: IModelRpcProps,  basicDefinitions: IModelBasicDefinitions, x: number, y: number, z: number, radius: number): Promise<string> {
    const iModel: IModelDb = IModelDb.findByKey(rpcProps.key);
    const location = new Point3d(0, 0, 0);
    const geom = Circle.generateGeometry(x, y, z, radius);

    const name = `Circle-${x}-${y}-${z}-${radius}`;

    const props: GeometricElement3dProps = {
      model: basicDefinitions.spatialModelId,
      code: Code.createEmpty(),
      classFullName: TestWorld.Class.Circle,
      category: Circle.getCategory(iModel).id,
      geom,
      placement: { origin: location, angles: new YawPitchRollAngles() },
      userLabel: name,
    };

    return iModel.elements.insertElement(props);
  }

  public async addSphere(rpcProps: IModelRpcProps, basicDefinitions: IModelBasicDefinitions, x: number, y: number, z: number, radius: number): Promise<string> {
    const iModel: IModelDb = IModelDb.findByKey(rpcProps.key);
    const location = new Point3d(0, 0, 0);
    const geom = SphereElement.generateGeometry(x, y, z, radius);

    const name = `Sphere-${x}-${y}-${z}-${radius}`;

    const props: GeometricElement3dProps = {
      model: basicDefinitions.spatialModelId,
      code: Code.createEmpty(),
      classFullName: TestWorld.Class.SphereElement,
      category: SphereElement.getCategory(iModel).id,
      geom,
      placement: { origin: location, angles: new YawPitchRollAngles() },
      userLabel: name,
    };

    return iModel.elements.insertElement(props);
  }

  public async addViewDefinition(rpcProps: IModelRpcProps, basicDefinitions: IModelBasicDefinitions, name: string): Promise<string> {
    const iModel: IModelDb = IModelDb.findByKey(rpcProps.key);
    const viewRange = new Range3d(-10, -10, -10, 10, 10, 10);

    const displayStyleId = DisplayStyle3d.insert(iModel, basicDefinitions.definitionModelId, name);

    return OrthographicViewDefinition.insert(iModel,
      basicDefinitions.definitionModelId, name,
      basicDefinitions.modelSelectorId, basicDefinitions.categorySelectorId,
      displayStyleId, viewRange,
    );
  }
  public async insertBasicDefinitions(rpcProps: IModelRpcProps): Promise<IModelBasicDefinitions> {
    const iModel: IModelDb = IModelDb.findByKey(rpcProps.key);
    const activityContext = new ClientRequestContext ("insert basic definitions");

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
      viewName,
    };
  }
  public async createIModel(filename: string): Promise<void> {

    const rootSubject: RootSubjectProps = {
      name: "IModelJsTestApp root subject",
      description: "dummy root subject",
    };

    const iModel = StandaloneDb.createEmpty(filename, {rootSubject});
    iModel.close();
  }

}
