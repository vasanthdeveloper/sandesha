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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../logger"));
const paths_1 = __importDefault(require("../paths"));
function locateTemplate(templateString) {
    return __awaiter(this, void 0, void 0, function* () {
        const absolute = path_1.default.isAbsolute(templateString);
        if (absolute) {
            if (fs_1.default.existsSync(`${templateString}.json`)) {
                return `${templateString}.json`;
            }
            else {
                logger_1.default.error(`A template with name "${path_1.default.basename(templateString)}.json" was not found at ${path_1.default.dirname(templateString)}`, 2);
            }
        }
        else {
            const absolutePath = path_1.default.resolve(`${templateString}.json`);
            if (fs_1.default.existsSync(absolutePath)) {
                return absolutePath;
            }
            else {
                const templatePath = path_1.default.join(paths_1.default.data, `${templateString}.json`);
                if (fs_1.default.existsSync(templatePath)) {
                    return templatePath;
                }
                else {
                    logger_1.default.error(`A template with name "${path_1.default.basename(templateString)}.json" was not\n      found at ${path_1.default.dirname(absolutePath)}\n      and ${paths_1.default.data}`, 2);
                }
            }
        }
    });
}
exports.default = locateTemplate;
