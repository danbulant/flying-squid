module.exports.server=function(serv)
{
  serv._writeAll= (packetName, packetFields) =>
    serv.players.forEach((player) => player._client.write(packetName, packetFields));

  serv._writeArray= (packetName, packetFields, players) =>
    players.forEach((player) =>player._client.write(packetName, packetFields));

  serv._writeNearby= (packetName, packetFields, loc) =>
    serv._writeArray(packetName, packetFields, serv.getNearby(loc));

  serv.getNearby= ({world,position,radius=8*16*32}) => serv.players.filter( player =>
    player.world == world &&
    player.position.distanceTo(position) <= radius
  );

  serv.getNearbyEntities= ({world,position,radius=8*16*32}) => Object.keys(serv.entities)
    .map(eId => serv.entities[eId])
    .filter(entity =>
      entity.world == world &&
      entity.position.distanceTo(position) <= radius
    );
};

module.exports.entity=function(entity,serv)
{
  
  entity.getNearby = () => serv
    .getNearbyEntities({
      world: entity.world,
      position: entity.position,
      radius: entity.viewDistance*32
    })
    .filter((e) => e != entity);

  entity.getOtherPlayers = () => serv.players.filter((p) => p != entity);

  entity.getOthers = () => serv.entities.filter((e) => e != entity);

  entity.getNearbyPlayers = (radius=entity.viewDistance*32) => entity.getNearby()
    .filter((e) => e.type == 'player');

  entity.nearbyPlayers = (radius=entity.viewDistance*32) => entity.nearbyEntities
    .filter(e => e.type == 'player')

  entity._writeOthers = (packetName, packetFields) =>
    serv._writeArray(packetName, packetFields, entity.getOtherPlayers());

  entity._writeOthersNearby = (packetName, packetFields) =>
    serv._writeArray(packetName, packetFields, entity.getNearbyPlayers());
}