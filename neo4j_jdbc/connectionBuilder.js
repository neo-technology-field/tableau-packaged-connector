(function dsbuilder(attr) {
  var server = attr["server"];
  var port = attr["port"];
  var tag = 'Neo4jConnector';

  var urlBuilder = (
    "jdbc:neo4j://" + server + ":" + port + "?"
  );

  var params = [];

  // Defaults
  params["LogLevel"] = "6";
  params["LogPath"] = "C:\\\\Softwares\\bi_conn";
  params["Auth_Type"] = "Basic";
  params["DefaultStringColumnLength"] = "500";
  params["StrictlyUseBoltScheme"] = "true";

  var driverOptions = attr[connectionHelper.attributeService];

  logging.Log(tag + ' DriverOptions=' + driverOptions);
  var userSpecifiedOptions = driverOptions.split('&');

  for (var idx in userSpecifiedOptions) {
    var pieces = userSpecifiedOptions[idx].split('=');
    params[pieces[0]] = pieces[1];
  }

  if (attr["username"] && attr["password"]) { 
    params["PWD"] = attr["password"];
    params["UID"] = attr["username"];
  }

  var formattedParams = [];

  for (var key in params) {
    formattedParams.push(
      connectionHelper.formatKeyValuePair(key, params[key])
    );
  }

  urlBuilder += formattedParams.join("&");
  logging.Log(tag + " combinedurl: " + urlBuilder);
  return [urlBuilder];
});
