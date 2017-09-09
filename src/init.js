require("./common/advices");

var App = require("./components/app/app.component");
var Host = require("./components/host/host.component");

document.body.querySelector("#app").innerHTML = new App().root();
