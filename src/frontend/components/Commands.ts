import { createImodel } from "../actions/IModelJsFileActions";

const createIModelCommand = {
  method: (args: any) => {
    createImodel(args._[0] || args.filename).catch(err => console.log(err));
  },
  options: [{name: 'filename', description: 'imodel filename to create', defaultValue: ''}]
}

export function getCommands(): any {
  return {
    createIModel: createIModelCommand
  };
}

export function getDescriptions(): any {
  return {
    createIModel: 'creates an imodel'
  };
}