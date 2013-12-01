# angelscripts

## help
List all angel commands currently attached

    $ angel help
      -> iterates all angel.reactor handlers
      -> extracts sensible help and returns it as table result

    $ angel help :command
      -> finds all commands matching 
      -> extracts sensible help descriptions and returns them as json

## git-release
Handy automation of simple day-to-day commands for incremental git release

    $ angel git-release
      -> uses angel.defaults { target, remote }
      -> increment package.json version
      -> commit && push to remote at target branch

    $ angel git-release :target to :remote
      -> increment package.json version
      -> commit && push to remote at target branch

    $ angel git-release :target to :remote at :branch
      -> increment package.json version
      -> commit && push to remote at given branch

## emit
Construct chemical from command line and emit into angel's plasma

    $ angel emit -type Chemical -property value


# Thanks to

## underscore 
http://underscorejs.org

## angelabilities
https://github.com/outbounder/angelabilities

## organic-angel
https://github.com/outbounder/organic-angel

## cli-table
http://github.com/guille

## jasmine-node
https://github.com/mhevery/jasmine-node