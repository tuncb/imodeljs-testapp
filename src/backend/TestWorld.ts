import { Schema, Schemas, IModelDb, SpatialCategory, ClassRegistry } from "@bentley/imodeljs-backend";
import { ClientRequestContext, IModelStatus } from "@bentley/bentleyjs-core";
import { IModelError, SubCategoryAppearance, ColorByName } from "@bentley/imodeljs-common";
import * as _schemaNames from "../common/TestWorldSchema";
import * as path from "path";
import * as circles from "./CircleElement";
import * as spheres from "./SphereElement";

export class TestWorld extends Schema {
  public static get schemaName(): string { return "TestWorld"; }
  public static registerSchema() {
    if (this !== Schemas.getRegisteredSchema(TestWorld.name))
      return;

    Schemas.registerSchema(this);
    ClassRegistry.registerModule(spheres, this);
    ClassRegistry.registerModule(circles, this);
  }

  // Import the RobotWorld schema into the specified iModel.
  // Also do some one-time bootstrapping of supporting definitions such as Categories.
  public static async importSchema(activityContext: ClientRequestContext, iModelDb: IModelDb): Promise<void> {
    activityContext.enter();
    if (iModelDb.containsClass(_schemaNames.Class.Circle) && iModelDb.containsClass(_schemaNames.Class.SphereElement))
      return Promise.resolve();

    if (iModelDb.isReadonly)
      throw new IModelError(IModelStatus.ReadOnly, "importSchema failed because IModelDb is read-only");

    // Must import the schema. The schema must be installed alongside the app in its
    // assets directory. Note that, for portability, make sure the case of
    // the filename is correct!
    await iModelDb.importSchema(activityContext, path.join(__dirname, "../assets/TestWorld.ecschema.xml"));

    // This is the right time to create definitions, such as Categories, that will
    // be used with the classes in this schema.
    TestWorld.bootStrapDefinitions(iModelDb);

    return Promise.resolve();
  }

  public static bootStrapDefinitions(iModelDb: IModelDb) {
    SpatialCategory.insert(iModelDb, IModelDb.dictionaryId, _schemaNames.Class.Circle, new SubCategoryAppearance({ color: ColorByName.silver }));
    SpatialCategory.insert(iModelDb, IModelDb.dictionaryId, _schemaNames.Class.SphereElement, new SubCategoryAppearance({ color: ColorByName.blue }));
  }

  // Look up the category to use for instances of the specified class
  public static getCategory(iModelDb: IModelDb, className: _schemaNames.Class): SpatialCategory {
    const categoryId = SpatialCategory.queryCategoryIdByName(iModelDb, IModelDb.dictionaryId, className);
    if (categoryId === undefined)
      throw new IModelError(IModelStatus.NotFound, "Category not found");
    return iModelDb.elements.getElement(categoryId) as SpatialCategory;
  }
}

/** Export the schema names so that they appear to be enums nested in the TestWorldSchema class/ns */
export namespace TestWorld {
  export const Class = _schemaNames.Class;

  export const Category = _schemaNames.Category;

  export const CodeSpec = _schemaNames.CodeSpec;
}
