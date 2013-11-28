# angelscripts

## emit

    $ angel emit -type Chemical -property value

## git-release

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