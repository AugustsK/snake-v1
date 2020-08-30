class Engine {
    methods = []

    lastAction = performance.now()

    highestPrecision = Infinity

    #tick() {
        window.requestAnimationFrame(this.#main.bind(this));
    }

    #main(timestamp) {
        if (timestamp - this.lastAction >= this.highestPrecision) {
            this.lastAction = timestamp;

            this.methods.forEach(method => {
                if (timestamp - method.lastAction >= method.frequency) {
                    method.lastAction = timestamp;
                    method.fn();
                }
            });
        }

        this.#tick();
    }

    #getExisting(id) {
        let matchedIndex;
        let result = this.methods.filter((method, index) => {
            if (method.id === id) {
                matchedIndex = index;

                return true;
            }

            return false;
        });

        return result.length === 1 ? {
            method: result[0],
            index: matchedIndex
        } : null;
    }

    #updateFrequency(frequency) {
        this.highestPrecision = frequency < this.highestPrecision ? frequency : this.highestPrecision;
    }

    /**
     * @param {string|int} id 
     * @param {Number} frequency 
     */
    update(id, frequency) {
        let existing = this.#getExisting(id);

        if (existing) {
            this.methods[existing.index].frequency = frequency;
            this.#updateFrequency(frequency);
        }
    }

    /**
     * @param {Object} methodDefinition 
     * @param {string|int|null} [methodDefinition.id]
     * @param {Function} methodDefinition.fn 
     * @param {Number} methodDefinition.frequency
     */
    add(methodDefinition) {
        if (!methodDefinition.id) {
            methodDefinition.id = Date.now();
        }

        if (!this.#getExisting(methodDefinition.id)) {
            methodDefinition.lastAction = performance.now();
            this.methods.push(methodDefinition);
            this.#updateFrequency(methodDefinition.frequency);
        }

        return methodDefinition.id;
    }

    clear() {
        this.methods = [];
    }

    constructor() {
        this.#tick();
    }
}

export { Engine };