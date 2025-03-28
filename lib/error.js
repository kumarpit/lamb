"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyVariablesError = exports.EmptyChoicesError = exports.DuplicateVariableError = exports.InvalidVariableNameError = void 0;
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
