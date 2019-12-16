function Block(size, isFree) {
    this.size = size;
    this.isFree = isFree;
};

Block.prototype.fill = function (size) {
    this.isFree = false;
};

Block.prototype.clear = function () {
    this.isFree = true;
};

module.exports = { Block };