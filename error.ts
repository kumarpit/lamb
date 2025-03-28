/**
 * Error class that defines shape of all errors
 * thrown on an exception in the Lamb library
 *
 * @class LambError
 * @param message error message - string
 */
class LambError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class InvalidVariableNameError extends LambError {
    constructor(message: string) {
        super(message);
    }
}

export class DuplicateVariableError extends LambError {
    constructor(message: string) {
        super(message);
    }
}

export class EmptyChoicesError extends LambError {
    constructor(message: string) {
        super(message);
    }
}

export class EmptyVariablesError extends LambError {
    constructor(message: string) {
        super(message);
    }
}

export class InvalidNumSolutions extends LambError {
    constructor(message: string) {
        super(message);
    }
}
