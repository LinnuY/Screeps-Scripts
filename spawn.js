var spawn = {
    harvesterMaxLength: 3,
    upgraderMaxLength: 2,
    builderMaxLength: 3,
    /** 
     * @param {StructureSpawn} spawn 
     * @param {String} ROOM_NAME
    */
    hatch: function (spawn, ROOM_NAME) {
        var harvesters = _.filter(Game.creeps, ((creep) => {
            return creep.memory.role == 'harvester'
                || creep.memory.role == 'maxHarvester'
                || creep.memory.oldRole == 'harvester'
        }));
        var upgraders = _.filter(Game.creeps, ((creep) => {
            return creep.memory.role == 'upgrader'
                || creep.memory.role == 'maxUpgrader'
                || creep.memory.oldRole == 'upgrader'
        }));
        var builders = _.filter(Game.creeps, ((creep) => {
            return creep.memory.role == 'builder'
                || creep.memory.role == 'maxBuilder'
                || creep.memory.oldRole == 'builder'
        }));
        console.log('Game.Time: '+Game.time
            + ',Harvesters: ' + harvesters.length
            + ',Upgraders: ' + upgraders.length
            + ',Builders: ' + upgraders.length);

        if (harvesters.length < this.harvesterMaxLength) {
            if (Game.rooms[ROOM_NAME].energyAvailable >= 550) {
                // 如果本房间中所有 spawn 和 extension 中的可用能量总额超过550,则生产一个MaxHarvester.
                var newName = 'MaxHarvester' + (Game.time % this.harvesterMaxLength + 1);

                if (spawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'maxHarvester' } }) == OK) {
                    console.log('Spawning new maxHarvester: ' + newName);
                }
            } else {
                var newName = 'Harvester' + (Game.time % this.harvesterMaxLength + 1);
                if (spawn.spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'harvester' } }) == OK) {
                    console.log('Spawning new harvester: ' + newName);
                }
            }

        }

        if (upgraders.length < this.upgraderMaxLength) {
            if (Game.rooms[ROOM_NAME].energyAvailable >= 550) {
                // 如果本房间中所有 spawn 和 extension 中的可用能量总额超过550,则生产一个MaxUpgrader.
                var newName = 'MaxUpgrader' + (Game.time % this.harvesterMaxLength + 1);
                if (spawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'maxUpgrader' } }) == OK) {
                    console.log('Spawning new maxUpgrader: ' + newName);
                }
            } else {
                var newName = 'Upgrader' + (Game.time % this.upgraderMaxLength + 1);
                if (spawn.spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'upgrader' } }) == OK) {
                    console.log('Spawning new upgrader: ' + newName);
                }
            }
        }

        if (builders.length < this.builderMaxLength) {
            if (Game.rooms[ROOM_NAME].energyAvailable >= 550) {
                // 如果本房间中所有 spawn 和 extension 中的可用能量总额超过550,则生产一个MaxBuilder.
                var newName = 'MaxBuilder' + (Game.time % this.harvesterMaxLength + 1);
                if (spawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'maxBuilder' } }) == OK) {
                    console.log('Spawning new maxBuilder: ' + newName);
                }
            } else {
                var newName = 'Builder' + (Game.time % this.builderMaxLength + 1);
                if (spawn.spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'builder' } }) == OK) {
                    console.log('Spawning new builder: ' + newName);
                }
            }
        }
    }
};

module.exports = spawn;