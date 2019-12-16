class Processor {
    constructor(tact) {
        this.tact = tact;
        this.status = "FREE";
        this.operation = null;
        this.completedTasks = [];
    };

    assignOperation(operation, currentTime) {
        if (this.operation) {
            throw new Error("This processor already in work");
        } else {
            this.status = "COMPUTING";
            this.operation = operation;
            this.operation.setStartOfComputing(currentTime);
        };
    };

    doOperation(currentTime) {
        this.operation.doOperation(this.tact);
        if (this.operation.status == "DONE") {
            this.status = "TRANSFERING";
            this.operation.setEndOfComputing(currentTime);
        };
    };

    transferData(currentTime) {
        this.operation.setTransferTime(currentTime);
        this.clearProcessor();
    };

    readFromCache(nextOperation, currentTime) {
        this.operation.setTransferTime("CACHE");
        this.clearProcessor();
        this.assignOperation(nextOperation, currentTime)
    };

    clearProcessor() {
        this.completedTasks.push(this.operation)
        this.operation = null;
        this.status = "FREE";
    };

    showComputedTasks() {
        return this.completedTasks;
    };
};

module.exports = { Processor };