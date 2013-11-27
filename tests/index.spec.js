var fs = require('fs')

describe("angelscripts", function(){

  var Angel = require("organic-angel")
  
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

  it("does release in dryrun", function(next){
    var instance = new Angel()
    instance.plasma.on("ready", function(){
      instance.loadScripts([__dirname+"/../src/release"], function(){
        instance.do("release master to origin "+__dirname+"/data dry", function(err, result){
          expect(err).toBe(null)
          var packageData = JSON.parse(fs.readFileSync(__dirname+"/data/package.json"))
          expect(packageData.version).toBe("0.0.1")
          fs.writeFileSync(__dirname+"/data/package.json",JSON.stringify({version: "0.0.0"}, null, 2))
          next()
        })
      })
    })
  })

  it("does release from one branch to another with remote in dryrun", function(next){
    var instance = new Angel()
    instance.plasma.on("ready", function(){
      instance.loadScripts([__dirname+"/../src/release"], function(){
        instance.do("release develop to origin at master "+__dirname+"/data dry", function(err, result){
          expect(err).toBe(null)
          var packageData = JSON.parse(fs.readFileSync(__dirname+"/data/package.json"))
          expect(packageData.version).toBe("0.0.1")
          fs.writeFileSync(__dirname+"/data/package.json",JSON.stringify({version: "0.0.0"}, null, 2))
          next()
        })
      })
    })
  })

  it("does release with setting dryrun outside", function(next){
    var instance = new Angel({dryrun: true})
    instance.plasma.on("ready", function(){
      instance.loadScripts([__dirname+"/../src/release"], function(){
        instance.do("release master to origin "+__dirname+"/data", function(err, result){
          expect(err).toBe(null)
          var packageData = JSON.parse(fs.readFileSync(__dirname+"/data/package.json"))
          expect(packageData.version).toBe("0.0.1")
          fs.writeFileSync(__dirname+"/data/package.json",JSON.stringify({version: "0.0.0"}, null, 2))
          next()
        })
      })
    })
  })

  it("does dryrun release without implicit cwd", function(next){
    var instance = new Angel({dryrun: true})
    instance.plasma.on("ready", function(){
      instance.loadScripts([__dirname+"/../src/release"], function(){
        process.chdir(__dirname+"/data")
        instance.do("release master to origin", function(err, result){
          expect(err).toBe(null)
          var packageData = JSON.parse(fs.readFileSync(__dirname+"/data/package.json"))
          expect(packageData.version).toBe("0.0.1")
          fs.writeFileSync(__dirname+"/data/package.json",JSON.stringify({version: "0.0.0"}, null, 2))
          next()
        })
      })
    })
  })
})