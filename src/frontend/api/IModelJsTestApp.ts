import { IModelApp } from "@bentley/imodeljs-frontend";
import { UiComponents } from "@bentley/ui-components";
import initRpc from "./rpc";
import { Presentation } from "@bentley/presentation-frontend";

// subclass of IModelApp needed to use imodeljs-frontend
export class ImodelJsTestApp {
  private static _isReady: Promise<void>;

  public static get ready(): Promise<void> { return this._isReady; }

  public static async startup(): Promise<void> {
    // contains various initialization promises which need
    // to be fulfilled before the app is ready
    await IModelApp.startup();
    const initPromises = new Array<Promise<any>>();

    initPromises.push(ImodelJsTestApp.initializeRpc());
    initPromises.push(IModelApp.i18n.registerNamespace("SimpleViewer").readFinished);
    initPromises.push(UiComponents.initialize(IModelApp.i18n));

    // initialize Presentation
    initPromises.push(Presentation.initialize({
      activeLocale: IModelApp.i18n.languageList()[0],
    }).then(() => {
      Presentation.selection.scopes.activeScope = "functional-element";
    }));

    // the app is ready when all initialization promises are fulfilled
    this._isReady = Promise.all(initPromises).then(() => { });
  }

  private static async initializeRpc(): Promise<void> {
    initRpc();
  }

}
