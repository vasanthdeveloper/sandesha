"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itivrutaha_1 = __importDefault(require("itivrutaha"));
exports.default = itivrutaha_1.default.createNewLogger({
    theme: ':type :message'
});
