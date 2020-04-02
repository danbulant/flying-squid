flying-squid - fork by Daniel Bulant
================

[![Discord](https://img.shields.io/badge/chat-on%20discord-brightgreen.svg)](https://discord.gg/dZtq4Qu)

Create Minecraft servers with a powerful, stable, and high level JavaScript API.

## New features (I added to fork)

* Permissions
* Player grouping
* Prefixes

## Test server

* No test server currently 24/7 of this fork *

## Building / Running
Before running or building it is recommended that you configure the server in `config/settings.json`

    npm install
    node app.js

Or try our autoupdating flying-squid server [autonomous-squid](https://github.com/mhsjlw/autonomous-squid)

You can also install flying-squid globally with `sudo npm install -g flying-squid`
and then run it with `flying-squid` command.

## World generation

There are several modules than can be used to generate the world. The default one is called diamond-square

* [node-voxel-worldgen](https://github.com/mhsjlw/node-voxel-worldgen) a voxel world generator written in Rust, compatible with flying-squid and allows basic minecraft-like generation including caves.
* [diamond-square](https://github.com/PrismarineJS/diamond-square) a diamond square minecraft generation

To install a world generation, all you have to do is npm install it and then change the generation option in settings.json.

## Plugins

* [flying-squid-irc](https://github.com/rom1504/flying-squid-irc) a bridge between a irc chan and the minecraft server.
Currently used between our test server (rom1504.fr) and our gitter room (through the official gitter irc bridge)
* [flying-squid-schematic](https://github.com/rom1504/flying-squid-schematic) Flying-squid plugin providing /listSchemas and /loadSchema commands. 
You can add schema through a simple http api and then add them in your world by just calling /loadSchema in game.
Http api available in the test instance at [flying-squid.rom1504.fr](http://flying-squid.rom1504.fr)
* [flying-squid-modpe](https://github.com/PrismarineJS/flying-squid-modpe) load modpe plugins
* [flying-squid-essentials](https://github.com/DeudlyYT/Flying-Squid-Essentials) Plugin that in a future will be like Essentials of bukkit/spigot.
All the basic commands that a server should have


## Documentation
For development see the [API documentation](API.md), [CONTRIBUTE.md](CONTRIBUTE.md) and [HISTORY.md](HISTORY.md)

## Using as a lib

flying-squid is also a server lib. Here is a basic example of usage:

```js
const mcServer = require('flying-squid')

mcServer.createMCServer({
  'motd': 'A Minecraft Server \nRunning flying-squid',
  'port': 25565,
  'max-players': 10,
  'online-mode': true,
  'logging': true,
  'gameMode': 1,
  'difficulty': 1,
  'worldFolder':'world',
  'generation': {
    'name': 'diamond_square',
    'options':{
      'worldHeight': 80
    }
  },
  'kickTimeout': 10000,
  'plugins': {

  },
  'modpe': false,
  'view-distance': 10,
  'player-list-text': {
    'header':'Flying squid',
    'footer':'Test server'
  },
  'everybody-op': true,
  'max-entities': 100,
  'version': '1.12.2'
})
```

You can add server plugins and player plugins in your package, following [CONTRIBUTE.md](https://github.com/PrismarineJS/flying-squid/blob/master/docs/CONTRIBUTE.md).

For further examples, see the [examples page.](https://PrismarineJS.github.io/flying-squid/#/examples)

## Contributors

 - [@mhsjlw](https://github.com/mhsjlw) creator of flying-squid
 - [@roblabla](https://github.com/roblabla) for helping out with the protocols
 - [@rom1504](https://github.com/rom1504) for massive contributions to the code
 - [@demipixel](https://github.com/demipixel) 
 - The PrismarineJS team for creating prismarine-chunk and node-minecraft-protocol
 - [wiki.vg](http://wiki.vg/Protocol) for documenting minecraft protocols
 - All of our other awesome contributors!
