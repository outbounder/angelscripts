var fs = require('fs')

describe("angelscripts", function(){

  var Angel = require("organic-angel")
  process.chdir(__dirname+"/data")
  
  it("does emit", function(next){
    var instance = new Angel()
    instance.plasma.on("ready", function(){
      instance.loadScripts([__dirname+"/../src/emit"], function(){
        instance.plasma.on("test", function(c, next){
          expect(c.property).toBe("test")
          next(c)
        })
        instance.do("emit -type test -property test", function(err, result){
          expect(err).toBe(null)
          expect(result.property).toBe("test")
          next()
        })  
      })  
    })
  })

  it("does release", function(next){
    var instance = new Angel({test: []})
    instance.plasma.on("ready", function(){
      instance.loadScripts([__dirname+"/../src/release"], function(){
        instance.do("git-release master to origin", function(err, result){
          expect(err).toBe(null)
          console.log(instance.dna.test)
          next()
        })
      })
    })
  })

  it("does release from one branch to another with remote in dryrun", function(next){
    var instance = new Angel({test: []})
    instance.plasma.on("ready", function(){
      instance.loadScripts([__dirname+"/../src/release"], function(){
        instance.do("git-release develop to origin at master", function(err, result){
          expect(err).toBe(null)
          console.log(instance.dna.test)
          next()
        })
      })
    })
  })
})