var Angel = require("organic-angel")
var exec = require("shellreactions-exec").exec
var fs = require('fs')

describe("angelscripts git-release", function(){
  var instance

  beforeEach(function(next){
    instance = new Angel({
      scripts: [__dirname+"/../src/git-release"]
    })
    instance.plasma.on("ready", function(){
      var options = {
        target: __dirname+"/test-repo"
      }
      exec([
        "mkdir -p {target}-origin",
        "cd {target}-origin",
        "git init --bare",

        "mkdir -p {target}",
        "cd {target}",
        "git init",
        "git remote add origin {target}-origin",
        "touch sample",
        "git add --all",
        "git commit -am 'initial commit'",
        "git push origin master",
        "git branch production",
        "git push origin production",
        "git checkout master"
      ], options, function(err, result){
        if(err) return next(err)
        process.chdir(options.target)
        fs.writeFile(options.target+"/package.json", JSON.stringify({
          "version": "0.0.0"
        }, null, 2), next)
      })
    })
  })

  afterEach(function(next){
    var options = {
      target: __dirname+"/test-repo",
    }
    exec(["rm -rf {target}", "rm -rf {target}-origin"], options, next)
  })

  it("does git-release", function(next){
    instance.dna.defaults = {
      remote : "origin",
      target: "master"
    }
    instance.do("git-release", function(err, result){
      expect(err).toBeFalsy()
      expect(result).toBeDefined()
      console.log(result)
      next()
    })
  })
  it("does git-release master to origin at production", function(next){
    instance.dna.defaults = {
      remote : "origin",
      target : "production"
    }
    instance.do("git-release master to origin at production", function(err, result){
      expect(err).toBeFalsy()
      expect(result).toBeDefined()
      console.log(result)
      next()
    })  
  })
})