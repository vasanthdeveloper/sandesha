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
const axios_1 = __importDefault(require("axios"));
const index_1 = __importDefault(require("../template/index"));
const logger_1 = __importDefault(require("../logger"));
function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('error', e => { reject(e); });
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    });
}
function send(templateString, command, globalOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = command.opts();
        let variables = [];
        if (options.stdin == true) {
            logger_1.default.info('Reading data from stdin');
            const inputString = yield streamToString(process.stdin);
            logger_1.default.okay('Finished reading data from stdin');
            variables = inputString.trim().replace(/ ~ /g, '~')
                .replace('\n', '~')
                .split('~');
        }
        else {
            logger_1.default.verbose('Skipped reading data from stdin');
        }
        const template = yield index_1.default(templateString, variables);
        const url = template.url;
        delete template.url;
        try {
            const sent = yield axios_1.default.post(url, template);
        }
        catch (e) {
            logger_1.default.error(`Failed to send the webhook with "${e.message}".`);
        }
    });
}
exports.default = send;
