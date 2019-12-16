const { Block } = require('./Block');

function BitMap(size, blockSize) {
    let addres = -1;
    this.size = size;
    this.freeBloks = size;
    this.bitMap = new Array(size).fill(null).map(() => {
        addres++;
        return { [addres]: new Block(blockSize, true) };
    });
};

BitMap.prototype.findTopInMap = function () {
    return this.size - this.freeBloks;
};

BitMap.prototype.writeNewData = function (from, to) {
    for (let key in this.bitMap) {
        if (key >= from & key < to) {
            this.bitMap[key][key].fill();
        }
    };
};

BitMap.prototype.locateNewData = function (numberOfBloks) {
    if (this.freeBloks > numberOfBloks) {
        this.writeNewData(this.findTopInMap(), this.findTopInMap() + numberOfBloks);
        this.freeBloks -= numberOfBloks;
        return [this.findTopInMap() - numberOfBloks, this.findTopInMap() - 1];
    } else {
        throw new Error("Error The Size of File bigger the size of free memory in File System");
    };
};

BitMap.prototype.readData = function (from, to) {
    for (let key in this.bitMap) {
        (key >= from & key < to) ?
            console.log(this.bitMap[key])
            :
            null;
    };
};

BitMap.prototype.writeNewData = function (from, to) {
    if (this.freeBloks > to - from) {

    } else {
        throw new Error("Error The Size of File bigger the size of free memory in File System");
    };
};



module.exports = { BitMap };
