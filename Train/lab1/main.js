const { Dir } = require('./Dir');


const DirSystem = (function () {
    let directory = {};

    const init = (name) => {
        directory = new Dir(1, name, name);
        return {
            mkdir: directory.create,
            rmdir: directory.delete,
            cd: directory.changeDir,
            pwd: directory.getName,
            symlink: directory.createSymLink,
        }
    };

    return { init };

})()

const directory = FileSystem.init('base')
directory.pwd()
