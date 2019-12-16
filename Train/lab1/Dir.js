const { DirTree } = require('./DirTree');

const dirTree = new DirTree();

function Dir(name, descriptor, parent) {
    this.name = name;
    this.files = [];
    this.links = [parent, name];
    this.symLink = [];
    this.limitOfSearchSymLinks = 3
    this.descriptor = descriptor;
};

Dir.prototype.create = function (dirName) {
    dirTree.append(this.getName, dirName);
    return new Dir(dirName, this.descriptor++, this.name);
}

Dir.prototype.delete = function (dirName) {
    if (this.links.length == 2) {
        dirTree.delete(dirName)
    } else {
        throw new Error("This directory has links")
    }
}

Dir.prototype.changeDir = function (dirName) {
    return dirTree.find(dirName)
}

Dir.prototype.getName = function () {
    console.log(this.name);
}

Dir.prototype.createSymLink = function (name1, name2) {
    let dirForLinking = dirTree.find(name1)
    let count = 0;
    if (dirForLinking) {
        dirForLinking.symLink.forEach(symLink => {
            if (symLink.name === dirForLinking) {
                throw new Error("Symbol link cycle")
            } else {
                this.symLink.push(name2);
            }
        });
    } else {
        throw new Error("Dir whith this name does not exists")
    }
}

module.exports = { Dir };
