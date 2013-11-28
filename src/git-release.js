var series = require("reactions").fn.series
var exec = require("shellreactions-exec").exec
var fs = require('fs')

var incrementPackageJSONVersion = function(options, next){
  fs.readFile(options.cwd+"/package.json", function(err, data){
    if(err) return next(err)
    var p = JSON.parse(data)
    var newVersion = p.version.split(".")
    newVersion[2] = (parseInt(newVersion[2])+1).toString()
    newVersion = newVersion.join(".")
    
    options.newVersion = newVersion
    options.oldVersion = p.version
    p.version = options.newVersion

    fs.writeFile(options.cwd+"/package.json", JSON.stringify(p, null, 2), function(err){
      if(err) return next(err)
      next(null, p)
    })
  })
}

module.exports = function(angel) {

  angel.on("git-release", function(options, next){
    options = angel.cloneDNA(options)
    angel.do("git-release {target} to {remote}", options, next)
  })

  angel.on("git-release :target to :remote", function(options, next){
    var run = series([
      incrementPackageJSONVersion("cmdData"),
      exec([
        "git add package.json",
        "git commit -m '{newVersion} release'",
        "git push {remote} {target}"
      ])
    ])
    run({ cmdData: angel.cloneDNA(options) }, next)
  })

  angel.on("git-release :base to :remote at :target", function(options, next){
    var run = series([
      exec([
        "git checkout {base}",
        "git pull --ff {remote} {base}",
        "git checkout {target}",
        "git pull --ff {remote} {target}",
        "git merge {base}"
      ]),
      angel.react("git-release {target} to {remote}", "cmdData"),
      exec("git checkout {base}")
    ])
    run({ cmdData: angel.cloneDNA(options) }, next)
  })
}