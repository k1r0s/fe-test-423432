var Advices = require("kaop/Advices");
var EventEmitter = require("./event-emitter");
var compiler = require("./compiler");
var appRepo = require("../services/app-repository.service");

Advices.locals.$ejsCompiler = compiler;
Advices.locals.$EE = new EventEmitter();
Advices.locals.$appRepo = appRepo;

Advices.add(
  function $emit(evid) {
    $EE.fire(evid, meta.result);
  },
  function $setupListeners() {
    var methods = Object.keys(meta.scope).filter(function(prop) { return typeof meta.scope[prop] === "function" })
    methods.filter(function(prop) { return prop.search("listen ") > -1 })
    .forEach(function(eventHandler){
      var evid = eventHandler.split(" ")[1];
      $EE.when(evid, meta.scope[eventHandler]);
    })
  },
  function $ejsCompile() {
    if (typeof meta.scope.__compileFn !== "function") {
      var rawTemplate = meta.args[0];
      var context = meta.scope;
      meta.scope.__compileFn = $ejsCompiler(rawTemplate, context);
    }

    meta.args.push(meta.scope.__compileFn(null));
  },
  function $getHostNames(){
    $appRepo.getHostNames(function(names){
      meta.args.push(names);
      next();
    });
  },
  function $getAttributteFromTarget(attrName){
    var event = meta.args[0];
    meta.args.push(event.currentTarget.getAttribute(attrName));
  },
  function $getTopAppsByHost(){
    var requestedHostName = meta.args[0];
    meta.args.push($appRepo.getTopAppsByHost(requestedHostName));
  },
  function $valueof(selector) {
    meta.args.unshift(meta.scope.q(selector).value);
  },
  function $registerDomListeners() {
    for (var prop in meta.scope) {
      if (meta.scope.hasOwnProperty(prop) && typeof meta.scope[prop] === "function") {
        meta.scope.on(prop, meta.scope[prop]);
      }
    }
  }
)
