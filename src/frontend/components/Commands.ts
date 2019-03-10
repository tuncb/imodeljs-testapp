import { createImodel, openIModel, closeIModel, insertDefinitions, addViewDefinition, addCircle } from "../actions/IModelJsFileActions";
import { AppState } from "./AppState";

interface OptionType {
  name: string;
  description: string;
  defaultValue: any;
}

interface CommandType {
  method: (this: React.Component<{}, AppState>, args: any) => void;
  options: OptionType[];
  description: string;
}

function PrintObjectToConsole(obj: any) {
  console.log(obj);
}

function PrintOkToConsole() {
  console.log('Ok.');
}

const createIModelCommand: CommandType = {
  method: function(this: React.Component<{}, AppState>, args: any) {
    createImodel(args._[0] || args.filename).then(PrintOkToConsole).catch(PrintObjectToConsole);
  },
  options: [{name: 'filename', description: 'imodel filename to create', defaultValue: ''}],
  description: 'creates an imodel'
}

const openIModelCommand: CommandType = {
  method: function(this: React.Component<{}, AppState>, args: any) {
    openIModel(this, args._[0] || args.filename).then(PrintOkToConsole).catch(PrintObjectToConsole);
  },
  options: [{name: 'filename', description: 'imodel filename to open', defaultValue: ''}],
  description: 'opens an imodel'
}

const closeIModelCommand: CommandType = {
  method: function(this: React.Component<{}, AppState>, _args: any) {
    closeIModel(this).then(PrintOkToConsole).catch(PrintObjectToConsole);
  },
  options: [],
  description: 'closes the open imodel'
}

const insertDefinitionsCommand: CommandType = {
  method: function(this: React.Component<{}, AppState>, _args: any) {
    insertDefinitions(this).then(PrintOkToConsole).catch(PrintObjectToConsole);
  },
  options: [],
  description: 'insert basic definitions to the open imodel'
}

const addViewDefinitionCommand: CommandType = {
  method: function(this: React.Component<{}, AppState>, _args: any) {
    addViewDefinition(this).then(PrintOkToConsole).catch(PrintObjectToConsole);
  },
  options: [],
  description: 'adds a view definitions to the open imodel'
}

const addCircleCommand: CommandType = {
  method: function(this: React.Component<{}, AppState>, args: any) {
    addCircle(this, args._[0] || args.x, args._[1] || args.y, args._[2] || args.z, args._[3] || args.radius).then(PrintOkToConsole).catch(PrintObjectToConsole);
  },
  options: [
    {name: 'x', description: 'x coordinate of the center of the circle', defaultValue: 0},
    {name: 'y', description: 'y coordinate of the center of the circle', defaultValue: 0},
    {name: 'z', description: 'z coordinate of the center of the circle', defaultValue: 0},
    {name: 'radius', description: 'radius of the circle', defaultValue: 1}
  ],
  description: 'adds a circle to the model'
}

function bindThis(command: CommandType, thisObject: React.Component<{}, AppState>) {
  return {
    method: command.method.bind(thisObject),
    options: command.options
  }
}

export function getCommands(thisObject: React.Component<{}, AppState>): any {
  return {
    createIModel: bindThis(createIModelCommand, thisObject),
    openIModel: bindThis(openIModelCommand, thisObject),
    closeIModel: bindThis(closeIModelCommand, thisObject),
    insertDefinitions: bindThis(insertDefinitionsCommand, thisObject),
    addViewDefinition: bindThis(addViewDefinitionCommand, thisObject),
    addCircle: bindThis(addCircleCommand, thisObject),
  };
}

export function getDescriptions(): any {
  return {
    createIModel: createIModelCommand.description,
    openIModel: openIModelCommand.description,
    closeIModel: closeIModelCommand.description,
    insertDefinitions: insertDefinitionsCommand.description,
    addViewDefinition: addViewDefinitionCommand.description,
    addCircle: addCircleCommand.description,
  };
}