const { Directory } = require('./Directory');


const FileSystem = (function () {
    const fileSystemSize = 1024;
    const blockSize = 32;
    const bitMapSize = fileSystemSize / blockSize;
    const limitOfDiscriptors = 8;
    const limitOfFileName = 12;
    let directory = {};

    const umaunt = () => {
        directory = null;
    };

    const createFile = (name, size) => {
        directory.createFile(name, size);
    };

    const showAllFiles = (name, size) => {
        directory.showAllFiles(name, size);
    };

    const findFileByID = (id) => {
        console.log(directory.findFileByID(id));
    };

    const openFile = (name) => {
        return directory.openFile(name);
    };

    const closeFile = (fd) => {
        directory.closeFile(fd);
    };

    const readFromFile = (fd, from, to) => {
        const end = Math.ceil(to / blockSize);
        directory.readFile(fd, from, end);
    };

    const writeToFile = (fd, from, to) => {
        directory.writeToFile(fd, from, to);
    }

    const createLink = (file, link) => {
        directory.createLink(file, link);
    }

    const deleteLink = (link) => {
        directory.deleteLink(link);
    }

    const truncate = (fd, from, to) => {
        directory.truncate(fd, from, to);
    }


    const maunt = () => {
        directory = new Directory(bitMapSize, blockSize, limitOfDiscriptors, limitOfFileName);
        return {
            create: createFile,
            ls: showAllFiles,
            filestat: findFileByID,
            open: openFile,
            close: closeFile,
            read: readFromFile,
            write: writeToFile,
            link: createLink,
            unlink: deleteLink,
            truncate,
            umaunt,
        }
    };

    return { maunt };

})()

const directory = FileSystem.maunt()
directory.create("first", 34)
directory.create("second", 104)
const fd = directory.open("second")
console.log("TEST")
directory.link("first", "fLink")
directory.link("first", "KLink")
directory.unlink("KLink")