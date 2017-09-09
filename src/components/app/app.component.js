var Class = require("kaop/Class");
var Component = require("../../common/component");

module.exports = App = Class.inherits(Component, {
  selector: "x-app",
  template: require('./app.component.ejs'),
  css: require('./app.component.css'),
  props: { hosts: [], viewAs: "list" },
  constructor: ["override", function(parent) {
    parent(this.props);
  }],
  "click #toggle-view": function(e){
    this.set("viewAs", this.props.viewAs === "list" ? "grid" : "list");
  },
  afterMount: function(){
    this.setHosts();
  },
  setHosts: ["$getHostNames", function(names){
    this.set("hosts", names);
  }]
});
