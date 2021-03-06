# Neo4j JDBC Driver Configuration Guide (Tableau Desktop) -- BETA 

## Running in Development

Clone this repo first to a local directory.

Use this option to test the configured Neo4j JDBC Driver with Tableau before proceeding with the next step.  This is only for development; for running
in customer deployments, see "Packaging" below.

### Windows

`<path_to_tableau's_bin_folder>tableau.exe -DConnectPluginsPath=C:\path\to\this\repo`

### Mac

`/Applications/Tableau\ Desktop\ <VERSION>.app/Contents/MacOS/Tableau -DConnectPluginsPath=/path/to/this/repo`.  

## Use the Named Driver

Normally when using the BI Connector, we connect by selecting "Other JDBC" as the
connection type.  With this packaged connector, we select "Neo4j JDBC" as the 
connection type, which should now appear as a connection type in Tableau.

# What are the files in this connector?

Best reference documentation [is found here](https://tableau.github.io/connector-plugin-sdk/docs/design), this is a brief
overview of "what's in the box".

* `manifest.xml` - the file that describes the overall structure & resources.  Identifies this connector as a subset of the JDBC dialect / connector in Tableau.  This also provides a list of "Tableau Capabilities" that the connector will use or reject; for example the BI Connector does not support the use of SQL temporary tables, so this capability is turned off.
* `dialect.tdd` - customizations of the dialect of SQL that Tableau will speak to this connector. (tdd is "Tableau Dialect Definition")
* `connection-dialog.tcd` which defines the fields which appear on the connector's connection dialog.
* `connection-resolver.tdr` needed to define custom attributes in the connection dialog.

# Packaging

## Install Tableau SDK Packaging Tool

This repo contains Tableau SDK tools as a submodule.  So refresh those first:

```
git submodule sync
cd connector-plugin-sdk

# Create a virtual environment (python3)
python3 -m venv .venv
source .venv/bin/activate

# Install connector-packager module
cd connector-packager && python3 setup.py install
```

## Run Packaging

Ensure you've activated the venv first, as above.  Then, from the `connector-plugin-sdk/connector-packager` directory:

```
python3 -m connector_packager.package ../../neo4j_jdbc/
```

Congratulations, you now have an unsigned taco file.

```
$ ls -l packaged-connector/neo4j_jdbc.taco 
-rw-r--r--  1 myuser staff  2521 Jul 16 12:42 packaged-connector/neo4j_jdbc.taco
```

You will notice that Tableau requires the .taco file to be signed in order for it to be loaded automatically.  In case we would like to test the .taco file without enforcing certificate verification, we can launch Tableau using the 
following option -DDisableVerifyConnectorPluginSignature=true (https://tableau.github.io/connector-plugin-sdk/docs/run-taco

## Signing

To avoid the need for disabling signatures, let's "sign a taco".   This requires
`jarsigner` which is distributed with your JVM.

How to actually execute `jarsigner` to do the signing is [covered here](https://tableau.github.io/connector-plugin-sdk/docs/package-sign) but the important bit is that this can't be done without a valid certificate that is trusted by 3rd parties.   We are investigating which certificate is the right one to use for this signing.

### Check if a connector is already signed

`jarsigner -verify ./packaged-connector/neo4j_jdbc.taco -verbose -certs -strict`

# Advanced Topics

## Tableau Datasource Verification Tool (TDVT)

Then do the following from the `connector-plugin-sdk/tdvt` directory.

* `python3 setup.py sdist --formats gztar` (Creates `dist/tdvt*.tar.gz` install package)
* `python3 -m pip install dist/tdvt-2.1.15.tar.gz` installs TDVT from the built package
* Verify that it's installed: `python3 -m pip list | grep tdvt`
* Create an empty environment: `python3 -m tdvt.tdvt action --setup`.  This will create a sample ini file named `config/tdvt/tdvt_override.ini`.
* Edit `config/tdvt/tdvt_override.ini` and customize the path to the tabquerytool binary.  On MacOS this will look something like `/Applications/Tableau\ Desktop\ 2020.2.app/Contents/MacOS/tabquerytool`.

 * Starting from Tableau 2019.4, Tableau provides a way to package and sign the configured Neo4j JDBC driver for distribution in a single .taco (Tableau Connector) file. [Instruction on how to package, sign and troubleshoot the .taco file can be viewed here](https://tableau.github.io/connector-plugin-sdk/docs/package-sign).
   
Once a .taco file is created, it can be placed under "My Tableau Repository/Connectors" and Tableau will use that file to automically load the configured Neo4j JDBC Driver.

# References
* [Tableau Plugin SDK Docs](https://tableau.github.io/connector-plugin-sdk/docs/)
* [How to create and configure a JDBC driver with example](https://tableau.github.io/connector-plugin-sdk/docs/example)
* [API reference when creating the configured JDBC driver](https://tableau.github.io/connector-plugin-sdk/docs/api-reference)
* [Driver capabilities that can be specified in the manifest.xml file (within neo4j_jdbc)](https://tableau.github.io/connector-plugin-sdk/docs/capabilities)
* [How to launch a configured JDBC Driver under development](https://tableau.github.io/connector-plugin-sdk/docs/share)
* [How to package a configured JDBC Driver into a .taco file](https://tableau.github.io/connector-plugin-sdk/docs/run-taco)

