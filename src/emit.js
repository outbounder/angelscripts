var _ = require("underscore")

module.exports = function(angel) {
  angel.on("emit :properties(.*)", function(options, next){
    var parts = options.properties.split(" ")
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
    var c = _.extend({type: options.type}, props)
    if(angel.dna.verbose)
      console.info("emit",c)
    angel.plasma.emit(c, function(r){
      if(r instanceof Error) return next(r)
      next(null, r)
    })
  })
}