var _ = require("underscore")

module.exports = function(angel) {
  angel.on("emit :properties(.*)", function(angel, next){
    var parts = angel.cmdData.properties.split(" ")
    var props = {}
    var currentKey = null
    for(var i = 0; i<parts.length; i++) {
      if(parts[i].indexOf("-") === 0)
        currentKey = parts[i].substr(1)
      else
        if(typeof props[currentKey] == "undefined")
          props[currentKey] = parts[i]
        else 
        if(typeof props[currentKey] == "string")
          props[currentKey] = [props[currentKey], parts[i]]
        else
          props[currentKey].push(parts[i])
    }
    if(angel.report)
      angel.report(this, props)
    if(angel.dontExecute)
      return next(null, false)
    angel.plasma.emit(props, function(r){
      if(r instanceof Error) return next(r)
      next(null, r)
    })
  })
  .example("$ angel emit -type test -property value -property2 value")
  .description("constructs and emits in angel's plasma a chemical from command line")
}