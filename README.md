# Neo4j JDBC Driver Configuration Guide (Tableau Desktop) -- BETA 

Setup and launch a configured Neo4j JDBC Driver (Windows):

 * Create a directory and place the Tableau plugin files (provided in the neo4j_jdbc
   folder of the package) within the created directory. For example,  
   C:\configured-jdbc-driver\neo4j_jdbc where "neo4j_jdbc" will include:     
    - connectionBuilder.js     
    - connection-dialog.tcd     
    - connectionResolver.tdr     
    - dialact.tdd     
    - manifest.xml

   Feel free to modify the above files based on your use case.

 * Run Tableau using the following argument when launching Tableau:
   <path_to_tableau's_bin_folder>tableau.exe -DConnectPluginsPath=C:\configured-jdbc-driver

   Use this option to test the configured Neo4j JDBC Driver with Tableau before proceeding
   with the next step.

 * Starting from Tableau 2019.4, Tableau provides a way to package and sign the configured
   Neo4j JDBC driver for distribution in a single .taco (Tableau Connector) file. 
   Instruction on how to package, sign and troubleshoot the .taco file can be viewed here:

   https://tableau.github.io/connector-plugin-sdk/docs/package-sign

   Once a .taco file is created, it can be placed under "My Tableau Repository/Connectors"
   and Tableau will use that file to automically load the configured Neo4j JDBC Driver.


# References

 * https://tableau.github.io/connector-plugin-sdk/docs/

 * How to create and configure a JDBC driver with example
   https://tableau.github.io/connector-plugin-sdk/docs/example

 * API reference when creating the configured JDBC driver
   https://tableau.github.io/connector-plugin-sdk/docs/api-reference

 * Driver capabilities that can be specified in the manifest.xml file (within neo4j_jdbc)
   https://tableau.github.io/connector-plugin-sdk/docs/capabilities

 * How to launch a configured JDBC Driver under development
   https://tableau.github.io/connector-plugin-sdk/docs/share
 
 * How to package a configured JDBC Driver into a .taco file
   https://tableau.github.io/connector-plugin-sdk/docs/run-taco


You will notice that Tableau requires the .taco file to be signed in order for it to be loaded automatically. 
In case we would like to test the .taco file without enforcing certificate verification, we can launch Tableau using the 
following option -DDisableVerifyConnectorPluginSignature=true (https://tableau.github.io/connector-plugin-sdk/docs/run-taco -- reference 
link also included in the README file)
