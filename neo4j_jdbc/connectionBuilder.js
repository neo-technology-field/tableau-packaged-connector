(function dsbuilder(attr) {
  var urlBuilder =
    "jdbc:neo4j://" +
    attr["server"] +
    ":" +
    attr["port"] +
    "?" +
    "Auth_Type=Basic";

  if (attr["username"] && attr["password"]) {
    urlBuilder += ";";
    var params = [];
    params["PWD"] = attr["password"];
    params["UID"] = attr["username"];

    var formattedParams = [];

    for (var key in params) {
      formattedParams.push(
        connectionHelper.formatKeyValuePair(key, params[key])
      );
    }

    urlBuilder += formattedParams.join(";");
  }

  //logging.log("combinedurl: " + urlBuilder);

  return [urlBuilder];
});
