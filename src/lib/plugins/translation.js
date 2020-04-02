const fs = require("fs");
module.exports = {};

module.exports.translation = ()=>{

    if(global.trans)return global.trans;

    var trans = {
        server: {
            disconnected: "&ePlayer %1 disconnected",
            disconnectedPrefix: true,
            particles: "Emitting %1 particles (count: %2, size: %3)"
        },
        defaults: {
            ban: "You've been banned from this server!",
            banIp: "Your IP have been banned from this server!",
        },
        commands: {
            ban: "You were banned from this server!",
            banB: "Player %1 was banned from this server!",
            kick: "You were kicked from this server!",
            kickB: "Player %1 was kicked!"
        },
        errors: {
            perms: "You don't have permission to do that!",
            maxParticle: "You can't spawn more than %1 particles",
            playerExists: "Player %1 is not on this server"
        },
        info: {
            particle: "Emit a particle at position"
        }
    };

    if(!fs.existsSync(__dirname + "/../../../config/translation.json")){
        fs.writeFileSync(__dirname + "/../../../config/translation.json", JSON.stringify(trans, null, 2));
    } else {
        trans = JSON.parse(fs.readFileSync(__dirname + "/../../../config/translation.json", "utf8"));
    }

    global.trans = trans;
    return trans;
}