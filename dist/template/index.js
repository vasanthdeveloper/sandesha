"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const locate_1 = __importDefault(require("./locate"));
const read_1 = __importDefault(require("./read"));
const validate_1 = __importDefault(require("./validate"));
const transform_1 = __importDefault(require("./transform"));
function processTemplate(templateString, variables) {
    return __awaiter(this, void 0, void 0, function* () {
        const templatePath = yield locate_1.default(templateString);
        const templateData = yield validate_1.default(yield read_1.default(templatePath));
        return (yield transform_1.default(templateData, variables));
    });
}
exports.default = processTemplate;
