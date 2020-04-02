const Vec3 = require('vec3').Vec3
const translation = require("./translation").translation();

module.exports.server = function (serv) {
  serv.emitParticle = (particle, world, position, { whitelist, blacklist = [], radius = 32, longDistance = true, size = new Vec3(1, 1, 1), count = 1 } = {}) => {
    const players = (typeof whitelist !== 'undefined' ? (whitelist instanceof Array ? whitelist : [whitelist]) : serv.getNearby({
      world: world,
      position: position,
      radius: radius
    }))

    serv._writeArray('world_particles', {
      particleId: particle,
      longDistance: longDistance,
      x: position.x,
      y: position.y,
      z: position.z,
      offsetX: size.x,
      offsetY: size.y,
      offsetZ: size.z,
      particleData: 1.0,
      particles: count,
      data: []
    }, players.filter(p => blacklist.indexOf(p) === -1))
  }
}

module.exports.player = function (player, serv) {
  player.commands.add({
    base: 'particle',
    info: translation.info.particle,
    usage: '/particle <id> [amount] [<sizeX> <sizeY> <sizeZ>]',
    permission: "world.emitParticle",
    parse (str) {
      const results = str.match(/(\d+)(?: (\d+))?(?: (\d+))?(?: (\d+))?(?: (\d+))?(?: (\d+))?/)
      if (!results) return false
      return {
        particle: parseInt(results[1]),
        amount: results[2] ? parseInt(results[2]) : 1,
        size: results[5] ? new Vec3(parseInt(results[3]), parseInt(results[4]), parseInt(results[5])) : new Vec3(1, 1, 1)
      }
    },
    action ({ particle, amount, size }) {
      if (amount >= 100000) {
        player.chat(translation.errors.maxParticle)
        return
      }
      player.chat(translation.server.particles.replace("%1", particle).replace("%2", amount).replace("%3", size.toString()));
      serv.emitParticle(particle, player.world, player.position, { count: amount, size: size })
    }
  })
}
