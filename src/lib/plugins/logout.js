const once = require('event-promise')
const permissions = require("./permissions").permissions();
const translation = require("./translation").translation();

module.exports.server = function (serv) {
  serv.quit = async (reason = 'Going down') => {
    await Promise.all(serv.players.map((player) => {
      player.kick(reason)
      return once(player, 'disconnected')
    }))
    serv._server.close()
    await once(serv._server, 'close')
  }
}

module.exports.player = function (player, serv) {
  player.despawnEntities = entities => player._client.write('entity_destroy', {
    'entityIds': entities.map(e => e.id)
  })

  player._client.on('end', () => {
    if (player && player.username) {
      var user = player.username;
      if(translation.server.disconnectedPrefix) user = permissions.getPrefix(player.username) + player.username + permissions.getSuffix(player.username);

      serv.broadcast(translation.server.disconnected.replace("%1", user));
      player._writeOthers('player_info', {
        action: 4,
        data: [{
          UUID: player.uuid
        }]
      })
      player.nearbyPlayers().forEach(otherPlayer => otherPlayer.despawnEntities([player]))
      delete serv.entities[player.id]
      player.emit('disconnected')
      const index = serv.players.indexOf(player)
      if (index > -1) {
        serv.players.splice(index, 1)
      }
      delete serv.uuidToPlayer[player.uuid]
    }
  })
}
