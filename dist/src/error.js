"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
require("dotenv/config");
var core_1 = __importDefault(require("@actions/core"));
var handleError = function (_a) {
    var message = _a.message;
    var environment = process.env.ENVIRONMENT;
    if (environment === 'development') {
        throw new Error("\n\uD83D\uDEA9 " + message + "\n");
    }
    else {
        core_1.default.error(message);
    }
};
exports.handleError = handleError;
