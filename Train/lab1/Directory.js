const { BitMap } = require('./BitMap');
const { Descriptor } = require('./Descriptor');
const { File } = require('./File');

function Directory(blockSize, bitMapSize, limitOfDiscriptors, limitOfFileName) {
    this.blockSize = blockSize;
    this.limitOfDiscriptors = limitOfDiscriptors + 1;
    this.limitOfFileName = limitOfFileName;
    this.bitMap = new BitMap(blockSize, bitMapSize);
    this.descriptor = new Descriptor('dir', 0, blockSize * bitMapSize, this.bitMap);
    this.files = [];
    this.links = []
};

Directory.prototype.createFile = function (name, size) {
    if (this.files.length < this.limitOfDiscriptors) {
        if (this.limitOfFileName >= name.length) {
            try {
                const locatedIn = this.bitMap.locateNewData(Math.ceil(size / this.blockSize), size);
                this.files.push({ [name]: new File(name, this.files.length + 1, size, locatedIn) });
            } catch (error) {
                console.log("Error The Size of File bigger then size of free memory in File System");
            };
        } else {
            console.log(`Maximum lenght of filename is: ${this.limitOfFileName}, you wrote ${name.length} characters`);
        };
    } else {
        console.log("Maximum count of discriptors in File System");
    };
};

Directory.prototype.showAllFiles = function () {
    this.files.map(file => console.log(file));
};

Directory.prototype.findFileByID = function (id) {
    if (this.files[id - 1]) {
        for (let key in this.files[id - 1]) {
            return this.files[id - 1][key].descriptor;
        };
    };
    console.log("File with this id does not exist");
};

Directory.prototype.findFileByProp = function (prop, value) {
    for (let files of this.files) {
        for (let key in files) {
            if (files[key][prop] == value) {
                return files[key]
            }
        }
    }
    throw new Error("File with this prop does not exist");
}

Directory.prototype.openFile = function (name) {
    try {
        return this.findFileByProp('name', name).open()
    } catch (error) {
        console.log("File with this name does not exist");
    }
};

Directory.prototype.closeFile = function (fd) {
    try {
        return this.findFileByProp('fd', fd).close()
    } catch (error) {
        console.log("File with this FD does not exist");
    }
};


Directory.prototype.readFile = function (fd, from, to) {
    try {
        const location = this.findFileByProp('fd', fd).getLocation();
        if (location[0] > from & location[1] > to) {
            this.bitMap.readData(from, to);
        } else {
            console.log("Incorrect sizes");
        }
    } catch (error) {
        console.log("File with this FD does not exist");
    }
};

Directory.prototype.writeToFile = function (fd, from, to) {
    try {
        const location = this.findFileByProp('fd', fd).getLocation();
        this.bitMap.writeNewData(from, to);
    } catch (error) {
        console.log("File with this FD does not exist");
    }
};

Directory.prototype.createLink = function (name, link) {
    try {
        const file = this.findFileByProp('name', name).addLink()
        this.links.push({ [link]: file })
    } catch (error) {
        console.log("File with this name does not exist");
    }
};

Directory.prototype.deleteLink = function (link) {
    try {
        for (let links of this.links) {
            for (let key in links) {
                if (key != link) {
                    this.links.push(links)
                }
            }
        }
        console.log(this.links)
    } catch (error) {
        console.log("File with this name does not exist");
    }
};


module.exports = { Directory };
