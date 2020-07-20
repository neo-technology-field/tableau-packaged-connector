(function dsbuilder(attr) {
  var server = attr["server"];
  var port = attr["port"];

  var urlBuilder = (
    "jdbc:neo4j://" + server + ":" + port + "?"
  );

  var params = [];

  params["LogLevel"] = "6";
  params["LogPath"] = "C:\\\\Softwares\\bi_conn";
  params["Auth_Type"] = "Basic";
  params["DefaultStringColumnLength"] = "500";
  params["StrictlyUseBoltScheme"] = "true";

  if (attr["username"] && attr["password"]) { 
    params["PWD"] = attr["password"];
    params["UID"] = attr["username"];
  }

  var otherOptions = '';
  var formattedParams = [];

  for (var key in params) {
    formattedParams.push(
      connectionHelper.formatKeyValuePair(key, params[key])
    );
  }

  urlBuilder += formattedParams.join(";");

  if (otherOptions) {
    urlBuilder += ";" + otherOptions;
  }

  logging.Log("combinedurl: " + urlBuilder);

  return [urlBuilder];
});
