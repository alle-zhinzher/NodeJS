class Operation {
    constructor(id, solveTime, dependence) {
        this.id = id;
        this.solveTime = solveTime;
        this.dependence = dependence;
        this.status = "WAITING";
        this.passedData = [];
        this.startOfComputing = null;
        this.endOfComputing = null;
        this.transferTime = null;

        if (dependence.length == 0) {
            this.markAsAviable();
        };
    };

    markAsDone() { this.status = "DONE" };

    markAsAviable() { this.status = "AVIABLE" };

    setStartOfComputing(time) { this.startOfComputing = time };

    setEndOfComputing(time) { this.endOfComputing = time };

    setTransferTime(time) { this.transferTime = time };

    passData(data) {
        this.passedData.push(data);
        if (this.dependence.contains(this.passedData)) {
            this.markAsAviable();
            console.log("000")
        }
    }

    doOperation(time) {
        const timeOnProcessor = time || 1;
        this.solveTime -= timeOnProcessor;
        if (this.solveTime <= 0) {
            this.markAsDone();
        };
    };
};

Array.prototype.contains = function (sub) {
    const self = this;
    const result = sub.filter(function (item) {
        return self.indexOf(item) > -1;
    });
    return self.length === result.length;
}

module.exports = { Operation }