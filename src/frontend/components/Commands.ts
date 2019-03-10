import { createImodel, openIModel, closeIModel } from "../actions/IModelJsFileActions";
import { AppState } from "./AppState";

interface OptionType {
  name: string;
  description: string;
  defaultValue: any;
}

interface CommandType {
  method: (this: React.Component<AppState, {}>, args: any) => void;
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
  method: function(this: React.Component<AppState, {}>, args: any) {
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
  };
}

export function getDescriptions(): any {
  return {
    createIModel: createIModelCommand.description,
    openIModel: openIModelCommand.description,
    closeIModel: closeIModelCommand.description,
  };
}