export class IModelBasicDefinitions {
  public constructor(
    public jubSubjectId: string,
    public definitionModelId: string,
    public spatialModelId: string,
    public modelSelectorId: string,
    public categorySelectorId: string,
    public displayStyleId: string,
    public viewName: string,
  )
  {}
}