# imodeljs-testapp

A prototype application to test if changes in an imodel reflected in an already created imodel.
Originally written for imodel version 0.189.0 where editing standalone imodel files were possible.
The current version 2.0 does not allow editing of snapshot imodel files so editing functionality currently does not work.

Setup:
* Clone the repo
* npm install
* npm run build
* npm run start:servers
* in your browser go to http://localhost:3000/ you should see the application running

The application allows you to create local imodel files and provides a simple edit and visualization functionality. It uses a simple schema file that has definitions for circle and sphere geometry. In the repl console you can execute command help to see available commands. Sample usage:
* createIModel e:\temp\model.imodel
* openIModel e:\temp\model.imodel

Does not work currently with snapshots of imodel.js 2.0:

* insertDefinitions
* addCircle -x=5 -y=5 -z=0 -r=2
* addSphere -x=-5 -y=-5 -z=0 -r=2
* addViewDefinition
* closeIModel

You can use the middle mouse button to pan, and wheel to zoom in and out.

The application was create to test if editing an imodel file after adding view definitions updated the visualization. At the time this feature was not implemented in imodel yet.
