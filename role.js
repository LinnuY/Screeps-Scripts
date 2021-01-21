var role = {

    /** @param {Creep} creep **/
    harvest: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            if (target == null) {
                creep.memory.changeBeginTime = Game.time;
                creep.memory.oldRole = creep.memory.role;
                creep.memory.role = 'upgrader';
            }
        }
    },

    /** @param {Creep} creep **/
    build: function (creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (target == null) {
                creep.memory.changeBeginTime = Game.time;
                creep.memory.oldRole = creep.memory.role;
                creep.memory.role = 'upgrader';
            }
            if (creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }

        }
        else {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE 
                        // ||structure.structureType == STRUCTURE_EXTENSION
                        ) &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                }
            });
            if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    },

    /** @param {Creep} creep **/
    upgrade: function (creep) {

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE 
                        // ||structure.structureType == STRUCTURE_EXTENSION
                        ) &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                }
            });
            if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    },

    /**
     * 
     * @param {Creep} creep 
     */
    change: function (creep) {
        if (creep.memory.changeBeginTime && Game.time - creep.memory.changeBeginTime >= 60) {
            creep.memory.role = creep.memory.oldRole;
            delete creep.memory.oldRole;
            delete creep.memory.changeBeginTime;
        }
    }
};

module.exports = role;