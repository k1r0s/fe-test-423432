var Class = require("kaop/Class");
var Component = require("../../common/component");
var _slice = require("lodash/slice");

module.exports = Host = Class.inherits(Component, {
  selector: "x-host",
  template: require('./host.component.ejs'),
  css: require('./host.component.css'),
  props: { host: "", top5apps: [] },
  constructor: ["override", function(parent, props) {
    parent(props);
  }],
  isRenderAllowed: function(){
    return this.props.host && this.props.top5apps instanceof Array;
  },
  "click #app-container": ["$getAttributteFromTarget: 'index'", function(e, value){
    var requestedApp = this.props.top5apps[parseInt(value)];
    alert(requestedApp.name + "'s version: " + requestedApp.version);
  }],
  afterMount: function(){
    this.set("host", this.props.host);
    this.getApps(this.props.host);
  },
  getApps: ["$getTopAppsByHost", function(hostName, top25apps){
    this.set("top5apps", _slice(top25apps, 0, 5));
  }]
});
