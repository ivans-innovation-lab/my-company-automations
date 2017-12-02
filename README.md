# my-company-automations

This repository contains examples demonstrating use of
the [Atomist][atomist] API.  You will find examples illustrating:

-   Creating bot commands using _command handlers_
-   Responding to DevOps events, e.g., commits pushed to a repository,
    using _event handlers_

These examples use the [`@atomist/automation-client`][client] node
module to implement a local client that connects to the Atomist API.

[client]: https://github.com/atomist/automation-client-ts (@atomist/automation-client Node Module)

## Prerequisites

### Access to Atomist testing environment

To get access to this preview, please reach out to members of Atomist
in the `#support` channel of [atomist-community Slack team][slack].

You'll receive an invitation to a [Slack team][play-slack]
and [GitHub organization][play-gh] that can be used to explore this
new approach to writing and running automations.

[play-slack]: https://atomist-playground.slack.com (Atomist Playground Slack)
[play-gh]: https://github.com/atomist-playground (Atomist Playground GitHub Organization)

### Node.js

You will need to have [Node.js][node] installed.  To verify that the
right versions are installed, please run:

```
$ node -v
v8.4.0
$ npm -v
5.4.1
```

[node]: https://nodejs.org/ (Node.js)

### Cloning the repository and installing dependencies

To get started run the following commands to clone the project,
install its dependencies, and build the project:

```
$ git clone git@github.com:atomist/my-company-automations.git
$ cd my-company-automations
$ npm install
$ npm run build
```

### Configuring your environment

If this is the first time you will be running an Atomist API client
locally, you should first configure your system using the
`atomist-config` script:

```
$ `npm bin`/atomist config [SLACK_TEAM_ID]
```

The script does two things: records what Slack team you want your
automations running in and creates
a [GitHub personal access token][token] with "read:org" scope.
You should add "repo" scopes to that [token][token] on Github, so your commands can change/add the repos.

You must run the automations in a Slack team of which you are a
member.  You can get the Slack team ID by typing `team` in a DM to the
Atomist Bot.  If you do not supply the Slack team ID on the command
line, the script will prompt you to enter it.

> *The Slack team ID for atomist-playground is `T7GMF5USG`.*

The `atomist-config` script will prompt you for your GitHub
credentials.  It needs them to create the GitHub personal access
token.  Atomist does not store your credentials and only writes the
token to your local machine.

The Atomist API client authenticates using a GitHub personal access
token.  The Atomist API uses the token to confirm you are who you say
you are and are in a GitHub org connected to the Slack team in which
you are running the automations.  In addition, the Atomist API only
allows members of the GitHub team `atomist-automation` to authenticate
and register a new client.  You will have to create a team in your
GitHub organization named `atomist-automation` and add the users who
want to create and register automations to it.

> *If you followed the instructions above and have been invited to
> the [atomist-playground][play-gh] GitHub organization, you will have
> been added to this team in that organization.*

[token]: https://github.com/settings/tokens (GitHub Personal Access Tokens)

## Starting up the automation-client

To start the client, run the following command:

```
$ npm run autostart
```

## Invoking a command handler from Slack

### Hello world
This project contains the code to create and respond to a simple
`hello world` bot command.  The code that defines the bot command and
implements responding to the command, i.e., the _command handler_, can
be found in [`HelloWorld.ts`][hello].  Once you have your local
automation client running (`npm run start`), you can
invoke the command handler by sending the Atomist bot the command in
the `#general` channel:

```
@atomist hello world
```

Once you've submitted the command in Slack, you'll see the incoming
and outgoing messages show up in the logs of your locally running
automation-client.  Ultimately, you should see the response from the
bot in Slack.

[hello]: https://github.com/ivans-innovation-lab/my-company-automations/blob/master/src/commands/HelloWorld.ts (HelloWorld Command Handler)

### Command/Domain side project generator
This project contains the code to create and respond to a simple
`generate command side API` bot command.  The code that defines the bot command and
implements responding to the command, i.e., the _command handler_, can
be found in [`commandSideGenerator.ts`][commandSideGenerator].  Once you have your local
automation client running (`npm run start`), you can
invoke the command handler by sending the Atomist bot the command in
the `#general` channel:

```
@atomist generate command side API
```

Once you've submitted the command in Slack, you'll see the incoming
and outgoing messages show up in the logs of your locally running
automation-client.  Ultimately, you should see the response from the
bot in Slack, asking you for some of the parameters for your new 'command side' project on Github.

[commandSideGenerator]: https://github.com/ivans-innovation-lab/my-company-automations/blob/master/src/commands/generator/commandSideGenerator.ts (Command Side Generator Command Handler)


## Support

If you find a problem, please create an [issue][].

[issue]: https://github.com/ivans-innovation-lab/my-company-automations/issues

## Development

You will need to install [node][] to build and test this project.

### Build and Test

Command | Reason
------- | ------
`npm install` | to install all the required packages
`npm start` | to start the Atomist automation client
`npm run autostart` | run the client, refreshing when files change
`npm run lint` | to run tslint against the TypeScript
`npm run compile` | to compile all TypeScript into JavaScript
`npm test` | to run tests and ensure everything is working
`npm run autotest` | run tests continuously
`npm run clean` | remove stray compiled JavaScript files and build directory


---
Created by [Ivan Dugalic][idugalic]@[lab][lab].
Need Help?  [Join our Slack team][slack].

[idugalic]: http://idugalic.pro
[lab]: http://lab.idugalic.pro
[slack]: https://communityinviter.com/apps/idugalic/idugalic
[atomist]: https://www.atomist.com/
