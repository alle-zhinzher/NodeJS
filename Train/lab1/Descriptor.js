function Descriptor(fileType, id, size, bitMapOfFile) {
    this.fileType = fileType;
    this.numberOfLinks = 1;
    this.id = id
    this.size = size;
    this.bitMapOfFile = bitMapOfFile;
};

module.exports = { Descriptor };