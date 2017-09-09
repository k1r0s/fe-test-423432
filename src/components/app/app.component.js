var Class = require("kaop/Class");
var Component = require("../../common/component");

module.exports = App = Class.inherits(Component, {
  selector: "x-app",
  template: require('./app.component.ejs'),
  props: { hosts: [] },
  constructor: ["override", function(parent) {
    parent(this.props);
  }],
  afterMount: function(){
    this.set("hosts", [1, 2, 3]);
  }
});
