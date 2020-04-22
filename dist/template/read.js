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
function readTemplate(templatePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const templateContents = yield fs_1.default.promises.readFile(templatePath, { encoding: 'UTF-8' });
        const defaultTemplate = {
            embeds: [],
            url: null,
            avatarUrl: null,
            content: null,
            username: null,
        };
        try {
            const templateData = JSON.parse(templateContents);
            for (const obj in defaultTemplate) {
                if (templateData[obj] == undefined)
                    templateData[obj] = defaultTemplate[obj];
            }
            for (const obj in templateData) {
                if (defaultTemplate[obj] === undefined)
                    logger_1.default.error(`Unknown element "${obj}" in ${path_1.default.basename(templatePath)} template.`, 3);
            }
            return templateData;
        }
        catch (e) {
            logger_1.default.error(`Invalid template "${e.message}"`, 3);
        }
    });
}
exports.default = readTemplate;
