var exec = require("shellreactions-exec")
var fs = require('fs')

module.exports = function(angel) {
  angel.on("git-release", function(options, next){
    angel.do("git-release #{target} to #{remote}", next)
  })

  angel.on("git-release :target to :remote :cwd? :dryrun?", function(options, next){
    if(!options.cwd)
      options.cwd = process.cwd()
    options = angel.cloneDNA(options)

    fs.readFile(options.cwd+"/package.json", function(err, data){
      if(err) return next(err)
      var p = JSON.parse(data)
      var newVersion = p.version.split(".")
      newVersion[2] = (parseInt(newVersion[2])+1).toString()
      newVersion = newVersion.join(".")
      
      options.newVersion = newVersion
      p.version = options.newVersion

      fs.writeFile(options.cwd+"/package.json", JSON.stringify(p, null, 2), function(err){
        if(err) return next(err)
        exec([
          "git add package.json",
          "git commit -am '#{newVersion} release'",
          "git push #{remote} #{target}"
        ], options, next)
      })
    });
      
  })

  angel.on("git-release :base to :remote at :target :cwd? :dryrun?", function(options, next){
    if(!options.cwd)
      options.cwd = process.cwd()
    options = angel.cloneDNA(options)
    exec([
      "git checkout #{base}",
      "git pull --ff #{remote} #{base}",
      "git checkout #{target}",
      "git pull --ff #{remote} #{target}",
      "git merge #{base}"
    ], options, function(err, result){
      if(err) return next(err)
      angel.do("git-release #{target} to #{remote} #{cwd} #{dryrun}", options, next)
    })
  })
}