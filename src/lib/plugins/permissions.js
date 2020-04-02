const fs = require('fs');

module.exports.player = (player, serv)=>{
    player.commands.add({
        base: "perms",
        info: "Permission commands",
        usage: "/perms ?",
        permissions: "commands.permissions",
        action (cmd) {
            var c = cmd.substr(cmd.indexOf(" ") == -1 ? 0 : cmd.indexOf(" "));

            switch(c){
                case "?":
                case "h":
                case "help":
                    player.chat("Help to be done");
                    break;
                default:
                    return "Command couldn't be found. Try /perms ?"
            }
        }
    });
    player.commands.add({
        base: "broadcast",
        info: "Broadcast message",
        usage: "/broadcast <message>",
        permission: "commands.broadcast",
        action(cmd){
            serv.broadcast(cmd);
        }
    })
}

module.exports.permissions = ()=>{
    if(!fs.existsSync(__dirname + "/../../../config/permissions.json")){
        console.log("Permission config file doesn't exist, creating one");
        var defaultPerms = {
            groups: {
                default: {
                    perms: ["world.*", "chat.*", "info.*"],
                    noPerms: ["world.difficulty", "world.changeGamemode"]
                }
            },
            players: {}
        }

        fs.writeFileSync(__dirname + "/../../../config/permissions.json", JSON.stringify(defaultPerms, null, 2));
    }
    global.permissions = JSON.parse(fs.readFileSync(__dirname + "/../../../config/permissions.json", 'utf8'));

    var permissions = {};
    permissions.getSeparator = ()=>"> ";
    permissions._getProperty = (player, property)=>{
        var group = "default";
        var perms = global.permissions;

        if(perms.players[player]){
            if(perms.players[player].group)group = perms.players[player].group;
            if(perms.players[player][property])return perms.players[player][property];
        }

        if(!perms.groups[group]){
            if(perms.groups.default)group = "default";
            else throw Error("No default permission group. Cannot continue.");
        }

        return perms.groups[group][property] || "";
    }
    permissions.getPrefix = (player)=>{
        return permissions._getProperty(player, "prefix");
    }
    permissions.getSuffix = (player)=>{
        return permissions._getProperty(player, "suffix");
    }

    permissions.hasPermission = (player, permission)=>{
        var permArr = permission.split(".");
        var group = "default";
        var perms = global.permissions;

        if(!perms.players)perms.players = {};
        if(!perms.groups)perms.groups = {};

        if(perms.players[player]){
            if(perms.players[player].group)group = perms.players[player].group;
        }

        if(!perms.groups[group]){
            if(perms.groups.default)group = "default";
            else throw Error("No default permission group. Cannot continue.");
        }

        var allowed = perms.groups[group].perms || [];
        var hasPermission = false;
        
        if(!Array.isArray(allowed)){
            console.warn("perms in group " + group + " is of wrong type");
            console.log(perms);
            console.log(perms.groups[group]);
            console.log(perms.groups[group].perms);
            console.log(allowed);
            allowed = [];
        }

        for(var perm of allowed){
            var p = perm.split(".");
            var isSame = true;
            for(var i in p){
                if(p[i] != permArr[i] && p[i] != "*"){
                    isSame = false;
                    break;
                }
            }
            if(isSame){
                hasPermission = true;
                break;
            }
        }

        var disallowed = perms.groups[group].noPerms || [];
        
        if(!Array.isArray(disallowed)){
            console.warn("noperms in group " + group + " is of wrong type");
            disallowed = [];
        }

        for(var perm of disallowed){
            var p = perm.split(".");
            var isSame = true;
            for(var i in p){
                if(p[i] != permArr[i] && p[i] != "*"){
                    isSame = false;
                    break;
                }
            }
            if(isSame){
                hasPermission = false;
                break;
            }
        }
        return hasPermission;
    }

    permissions.loadState = ()=>{
        global.permissions = fs.readFileSync(__dirname + "/../../../config/permissions.json", 'utf8');
        return global.permissions;
    }
    permissions.saveState = ()=>{
        return fs.writeSync(__dirname + "/../../../config/permissions.json", JSON.stringify(global.permission));
    }
    return permissions;
}