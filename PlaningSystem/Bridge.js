class Bridge {
    constructor() {
        this.isFree = true;
    };

    getStatus() { return this.isFree };

    seizeBridge() { this.isFree = false };

    freeBridge() { this.isFree = true };
};

module.exports = { Bridge };