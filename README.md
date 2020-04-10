# imodeljs-testapp

A prototype application to test if changes in an imodel reflected in an already created imodel.
It uses imodel version 0.189.0 but updating to newer versions should not be that much of a work (depending on the changes in creating and updating local imodel files).

Setup:
* Clone the repo
* yarn (depending on your node version you might have to use yarn --ignore-engines
* yarn build
* yarn start:servers
* in your browser go to http://localhost:3000/ you should see the application running

The application allows you to create local imodel files and provides a simple edit and visualization functionality. It uses a simple schema file that has definitions for circle and sphere geometry. In the repl console you can execute command help to see avaialble commands. Sample usage:
* createIModel e:\temp\model.imodel
* openIModel e:\temp\model.imodel
* insertDefinitions
* addCircle -x=5 -y=5 -z=0 -r=2
* addSphere -x=-5 -y=-5 -z=0 -r=2
* addViewDefinition
* closeIModel

The application was create to test if editing an imodel file after adding view definitions updated the visualization. At the time this feature was not implemented in imodel yet.
