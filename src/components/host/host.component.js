var Class = require("kaop/Class");
var Component = require("../../common/component");

module.exports = Host = Class.inherits(Component, {
  selector: "x-host",
  template: require('./host.component.ejs'),
  props: { host: {} },
  constructor: ["override", function(parent, props) {
    parent(props);
  }],
  afterMount: function(){
    this.set("host", this.props.host);
  }
});
