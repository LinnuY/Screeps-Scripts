var map = {
    structureMap: {
        roadList: [
            [2, 4],
            [3, 4],
            [1, 5],
            [2, 5],
            [1, 6],
            [1, 7],
            [1, 8],
            [1, 9],
            [1, 10],
            [2, 10],
            [5, 10],
            [2, 11],
            [3, 11],
            [4, 11],
            [5, 11],
            [20, 8],
            [20, 9],
            [20, 10],
            [20, 11],
            [20, 12],
            [20, 13],
            [21, 13],
            [21, 14]
        ],
        extensionList: [
            [6, 11],
            [7, 11],
            [15, 8],
            [16, 8],
            [19, 15],
            [20, 15],
            [21, 15],
            [21, 9],
            [21, 10],
            [21, 11]
        ],
        towerList: [
            [13, 10]
        ],
        storageList: [
            [18, 7]
        ]
    },
    /**
     * @param {String} SPAWN_NAME
     */
    build: function (SPAWN_NAME) {
        var roadList = this.structureMap.roadList;
        for (var pos in roadList) {
            if (Game.spawns[SPAWN_NAME].room.createConstructionSite(pos[0], pos[1], STRUCTURE_ROAD) == OK) {
                console.log('Build new road(' + pos[0] + ',' + pos[1] + ') success!');
            }
        }
        var extensionList = this.structureMap.extensionList;
        for (var pos in extensionList) {
            if (Game.spawns[SPAWN_NAME].room.createConstructionSite(pos[0], pos[1], STRUCTURE_EXTENSION) == OK) {
                console.log('Build new Extension(' + pos[0] + ',' + pos[1] + ') success!');
            }
        }
        var towerList = this.structureMap.towerList;
        for (var pos in towerList) {
            if (Game.spawns[SPAWN_NAME].room.createConstructionSite(pos[0], pos[1], STRUCTURE_TOWER) == OK) {
                console.log('Build new Tower(' + pos[0] + ',' + pos[1] + ') success!');
            }
        }
        var storageList = this.structureMap.storageList;
        for (var pos in storageList) {
            if (Game.spawns[SPAWN_NAME].room.createConstructionSite(pos[0], pos[1], STRUCTURE_STORAGE) == OK) {
                console.log('Build new Storage(' + pos[0] + ',' + pos[1] + ') success!');
            }
        }
    }
}

module.exports = map;