# angelscripts

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

## organic-angel
https://github.com/outbounder/organic-angel

## shellreactions-exec
https://github.com/outbounder/shellreactions-exec

## reactions
https://github.com/vbogdanov/reactions

## underscore 
http://underscorejs.org

## jasmine-node
https://github.com/mhevery/jasmine-node