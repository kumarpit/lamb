"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidNumSolutions = exports.EmptyVariablesError = exports.EmptyChoicesError = exports.DuplicateVariableError = exports.InvalidVariableNameError = void 0;
/**
 * Error class that defines shape of all errors
 * thrown on an exception in the Lamb library
 *
 * @class LambError
 * @param message error message - string
 */
class LambError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
class InvalidVariableNameError extends LambError {
    constructor(message) {
        super(message);
    }
}
exports.InvalidVariableNameError = InvalidVariableNameError;
class DuplicateVariableError extends LambError {
    constructor(message) {
        super(message);
    }
}
exports.DuplicateVariableError = DuplicateVariableError;
class EmptyChoicesError extends LambError {
    constructor(message) {
        super(message);
    }
}
exports.EmptyChoicesError = EmptyChoicesError;
class EmptyVariablesError extends LambError {
    constructor(message) {
        super(message);
    }
}
exports.EmptyVariablesError = EmptyVariablesError;
class InvalidNumSolutions extends LambError {
    constructor(message) {
        super(message);
    }
}
exports.InvalidNumSolutions = InvalidNumSolutions;
