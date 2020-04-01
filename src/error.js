class PandaDBError extends Error {
    constructor(message, errorName = "PandaDBError") {
        super();

        this.name = errorName;
        this.message = message;
    }
}

module.exports = PandaDBError;