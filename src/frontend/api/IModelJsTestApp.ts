import { IModelApp } from "@bentley/imodeljs-frontend";
import { UiCore } from "@bentley/ui-core";
import { UiComponents } from "@bentley/ui-components";
import initRpc from "./rpc";

// subclass of IModelApp needed to use imodeljs-frontend
export class ImodelJsTestApp {
  private static _isReady: Promise<void>;

  public static get ready(): Promise<void> { return this._isReady; }

  public static startup() {
    // contains various initialization promises which need
    // to be fulfilled before the app is ready
    IModelApp.startup();
    const initPromises = new Array<Promise<any>>();

    // initialize localization for the app
    initPromises.push(IModelApp.i18n.registerNamespace("SimpleViewer").readFinished);
    // initialize UiCore
    initPromises.push(UiCore.initialize(IModelApp.i18n));

    // initialize UiComponents
    initPromises.push(UiComponents.initialize(IModelApp.i18n));

    // initialize RPC communication
    initPromises.push(ImodelJsTestApp.initializeRpc());

    // the app is ready when all initialization promises are fulfilled
    this._isReady = Promise.all(initPromises).then(() => { });
  }

  private static async initializeRpc(): Promise<void> {
    initRpc();
  }

}
