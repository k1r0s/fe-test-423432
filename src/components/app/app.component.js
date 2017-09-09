var Class = require("kaop/Class");
var Component = require("../../common/component");

module.exports = App = Class.inherits(Component, {
  selector: "x-app",
  template: require('./app.component.ejs'),
  css: require('./app.component.css'),
  props: { hosts: [] },
  constructor: ["override", function(parent) {
    parent(this.props);
  }],
  afterMount: function(){
    this.setHosts();
  },
  setHosts: ["$getHostNames", function(names){
    this.set("hosts", names);
  }]
});
