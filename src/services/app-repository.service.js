var axios = require("axios");
var _flatMapDeep = require("lodash/flatMapDeep");
var _union = require("lodash/union");
var _slice = require("lodash/slice");
var _map = require("lodash/map");
var _filter = require("lodash/filter");
var _includes = require("lodash/includes");
var _sortBy = require("lodash/sortBy");
var _reverse = require("lodash/reverse");
var _find = require("lodash/find");

module.exports = {
  raw: null,
  parsed: null,
  fetchApps: function(){
    var appPromise = axios.get("data/host-app-data.json");
    appPromise.then(this.groupAppsByHost.bind(this));
    return appPromise;
  },
  getHostNames: function(cbk){
    function resolve() {
      cbk(_map(this.parsed, function(host) { return host.name }));
    }

    this.fetchApps().then(resolve.bind(this));
  },
  groupAppsByHost: function(response){
    this.parsed = _map(_union(_flatMapDeep(response.data, function(item) { return item.host } )), function(host, index) {
      return {
        name: host,
        apps: _filter(response.data, function(item) { return _includes(item.host, host)})
      }
    });
  },
  getTopAppsByHost: function(requestedHostName){
    var host = _find(this.parsed, function(app){ return app.name === requestedHostName })
    return _slice(_sortBy(host.apps, "apdex", ['desc']), 0, 25);
  }
}
