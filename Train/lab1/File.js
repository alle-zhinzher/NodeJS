const { Descriptor } = require('./Descriptor');

function File(name, id, size, lacatedIn) {
    this.name = name;
    this.linksCount = 0;
    this.symLink = [];
    this.limitOfSearchSymLinks = 3
    this.fd = null;
};

File.prototype.symLink = function (linkTo) {


};

File.prototype.open = function () {
    this.fd = `${Math.random() + Math.random()}`.slice(2, 8);
    console.log("FD for opened file:", this.fd);
    return this.fd;
};

File.prototype.close = function () {
    this.fd = null;
    console.log("File closed");
};

File.prototype.getLocation = function () {
    return this.descriptor.bitMapOfFile;
};

File.prototype.addLink = function () {
    return this.linksCount++;
};

module.exports = { File };
