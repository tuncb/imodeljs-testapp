import { GeometryStreamBuilder, GeometryStreamProps } from "@bentley/imodeljs-common";
import { Sphere, Point3d } from "@bentley/geometry-core";
import { TestWorld } from "./TestWorld";
import { IModelDb, SpatialCategory, PhysicalElement } from "@bentley/imodeljs-backend";

export class SphereElement extends PhysicalElement  {
  //  Define the properties added by this subclass
  public radius: number = 1;
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  // Note: Do not redefine the constructor. You must not interfere with the constructor that is
  // already defined by the base Element class.

  public static generateGeometry(x: number, y: number, z: number, radius: number): GeometryStreamProps {
    const builder = new GeometryStreamBuilder();
    const sphere = Sphere.createCenterRadius(Point3d.create(x, y, z), radius);
    builder.appendGeometry(sphere);
    return builder.geometryStream;
  }

  public static getCategory(iModel: IModelDb): SpatialCategory {
    return TestWorld.getCategory(iModel, TestWorld.Class.SphereElement);
  }
}