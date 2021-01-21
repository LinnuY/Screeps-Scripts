var role = require('role');
var spawn = require('spawn');
var map = require('map');
// var https = require('http');

const ROOM_NAME = 'W7N7';
const SPAWN_NAME = 'LinuY';

var isPost = 'false';
// var isPost = 'true';

module.exports.loop = function () {

    if (isPost == 'true') {
        const data = JSON.stringify({
            hello: 'hello'
        })

        const options = {
            hostname: 'localhost',
            port: 8080,
            path: '/hello/index',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }

        const req = https.request(options, res => {
            console.log(`状态码: ${res.statusCode}`)

            res.on('data', d => {
                process.stdout.write(d)
            })
        })

        req.on('error', error => {
            console.error(error)
        })

        req.write(data)
        req.end()
        isPost = 'false';
    }

    // 清除无用的缓存
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // 生产新的creep
    spawn.hatch(Game.spawns[SPAWN_NAME], ROOM_NAME);

    // 如果spawn正在生产,则打印出生产中
    if (Game.spawns[SPAWN_NAME].spawning) {
        var spawningCreep = Game.creeps[Game.spawns[SPAWN_NAME].spawning.name];
        Game.spawns[SPAWN_NAME].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[SPAWN_NAME].pos.x + 1,
            Game.spawns[SPAWN_NAME].pos.y,
            { align: 'left', opacity: 0.8 });
    }

    // 设置建筑
    map.build(SPAWN_NAME);

    // 将creep的角色和行为进行绑定
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester' || creep.memory.role == 'maxHarvester') {
            role.harvest(creep);
        }
        if (creep.memory.role == 'upgrader' || creep.memory.role == 'maxUpgrader') {
            role.upgrade(creep);
        }
        if (creep.memory.role == 'builder' || creep.memory.role == 'maxBuilder') {
            role.build(creep);
        }
        role.change(creep);
    }
}

