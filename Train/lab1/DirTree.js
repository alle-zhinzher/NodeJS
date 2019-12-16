function DirTree() {
    this.tree = []
};


DirTree.prototype.append = function (parent, dirName) {
    this.tree.push([parent, dirName])
}

DirTree.prototype.delete = function (dirName) {
    this.tree.forEach(dir => {
        if (dir.name == dirName) { delete dir }
    })
}

DirTree.prototype.find = function (dirName) {
    return this.tree.find(dir.name == dirName);
}

module.exports = { DirTree };
