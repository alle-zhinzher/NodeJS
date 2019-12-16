const { Processor } = require('./Processor');
const { Bridge } = require('./Bridge');
const { Operation } = require('./Operation');


class Planner {
    constructor() {
        this.computedOp = [];
        this.aviableOp = [];
        this.procesors = [];
        this.bridge = new Bridge();
        this.operations = [];
    };

    loadOperations() {
        this.operations = [
            new Operation(1, 3, []),
            new Operation(2, 2, []),
            new Operation(3, 1, [1, 2]),
            new Operation(4, 2, [3]),
            new Operation(5, 2, [3]),
            new Operation(6, 2, [3]),
            new Operation(7, 5, [4, 5, 6]),
        ];
    };

    loadProcessors(n) {
        this.procesors = new Array(n).fill(new Processor(1))
    };

    getAllAviableOp() {
        this.aviableOp = this.operations.filter(operation => operation.status == "AVIABLE");
    }
};

planner = new Planner();
planner.loadOperations();
planner.loadProcessors(3);
console.log(planner.procesors);
planner.getAllAviableOp();
console.log(planner.aviableOp);
