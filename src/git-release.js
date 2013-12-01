var fs = require('fs')

var incrementPackageJSONVersion = function(angel, next){
  fs.readFile(process.cwd()+"/package.json", function(err, data){
    if(err) return next(err)
    var p = JSON.parse(data)
    var newVersion = p.version.split(".")
    newVersion[2] = (parseInt(newVersion[2])+1).toString()
    newVersion = newVersion.join(".")
    
    p.version = newVersion
    angel.cmdData.newVersion = newVersion
    if(angel.report)
      angel.report(this, p)
    if(angel.dontExecute)
      return next(null, false)

    fs.writeFile(process.cwd()+"/package.json", JSON.stringify(p, null, 2), function(err){
      if(err) return next(err)
      next(null, p)
    })
  })
}

module.exports = function(angel) {

  require("angelabilities/src/reactions")(angel)
  require("angelabilities/src/shell")(angel)

  var gitrelease = angel.on("git-release", function(angel, next){
    angel.cmdData.target = angel.dna.defaults.target
    angel.cmdData.remote = angel.dna.defaults.remote
    angel.do("git-release {target} to {remote}", next)
  })
  .example("$ angel git-release")
  .description("increments package.json version, commits and pushes to dna.defaults(target&remote)")

  angel.on("git-release :target to :remote", angel.series([
    incrementPackageJSONVersion,
    angel.exec([
      "git add package.json",
      "git commit -m '{newVersion} release'",
      "git push {remote} {target}"
    ])
  ]))
  .example("$ angel git-release master to origin")
  .description(gitrelease.data['description'])

  angel.on("git-release :base to :remote at :target", angel.series([
    angel.exec([
      "git checkout {base}",
      "git pull --ff {remote} {base}",
      "git checkout {target}",
      "git pull --ff {remote} {target}",
      "git merge {base}"
    ]),
    angel.do("git-release {target} to {remote}"),
    angel.exec("git checkout {base}")
  ]))
  .example("$ angel git-release master to origin at production")
  .description(gitrelease.data['description'])
}