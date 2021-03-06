import { GeometryStreamBuilder, GeometryStreamProps } from "@bentley/imodeljs-common";
import { Arc3d, Point3d } from "@bentley/geometry-core";
import { TestWorld } from "./TestWorld";
import { IModelDb, SpatialCategory, PhysicalElement } from "@bentley/imodeljs-backend";

export class Circle extends PhysicalElement  {
  //  Define the properties added by this subclass
  public radius: number = 1;
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  // Note: Do not redefine the constructor. You must not interfere with the constructor that is
  // already defined by the base Element class.

  public static generateGeometry(x: number, y: number, z: number, radius: number): GeometryStreamProps {
    const builder = new GeometryStreamBuilder();
    const circle = Arc3d.createXY(Point3d.create(x, y, z), radius);
    builder.appendGeometry(circle);
    return builder.geometryStream;
  }

  public static getCategory(iModel: IModelDb): SpatialCategory {
    return TestWorld.getCategory(iModel, TestWorld.Class.Circle);
  }
}