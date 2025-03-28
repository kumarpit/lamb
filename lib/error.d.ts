/**
 * Error class that defines shape of all errors
 * thrown on an exception in the Lamb library
 *
 * @class LambError
 * @param message error message - string
 */
declare class LambError extends Error {
    constructor(message: string);
}
export declare class InvalidVariableNameError extends LambError {
    constructor(message: string);
}
export declare class DuplicateVariableError extends LambError {
    constructor(message: string);
}
export declare class EmptyChoicesError extends LambError {
    constructor(message: string);
}
export declare class EmptyVariablesError extends LambError {
    constructor(message: string);
}
export declare class InvalidNumSolutions extends LambError {
    constructor(message: string);
}
export {};
