var exec = require("shellreactions-exec")
var fs = require('fs')

module.exports = function(angel) {
  angel.on("release :target to :remote :cwd? :dryrun?", function(options, next){
    if(!options.cwd)
      options.cwd = process.cwd()
    options = angel.cloneDNA(options)

    exec("git pull --ff #{remote} #{target}", options, function(err, result){
      if(err) return next(err)

      fs.readFile(options.cwd+"/package.json", function(err, data){

        var p = JSON.parse(data)
        var newVersion = p.version.split(".");
        newVersion[2] = (parseInt(newVersion[2])+1).toString();
        newVersion = newVersion.join(".");
        
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
  })

  angel.on("release :base to :remote at :target :cwd? :dryrun?", function(options, next){
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
      angel.do("release #{target} to #{remote} #{cwd} #{dryrun}", options, next)
    })
  })
}