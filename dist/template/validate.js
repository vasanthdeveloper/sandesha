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
const url_parse_1 = __importDefault(require("url-parse"));
const logger_1 = __importDefault(require("../logger"));
function validateTemplate(template) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!template.url)
            logger_1.default.error('A template url was not provided.', 4);
        const parsed = url_parse_1.default(template.url);
        if (parsed.protocol != 'https:')
            logger_1.default.error(`Webhook url with protocol "${parsed.protocol}" is not secure`, 4);
        if (parsed.host != 'discordapp.com')
            logger_1.default.error('This webhook doesn\'t resolve to discord', 4);
        if (!parsed.pathname.startsWith('/api/webhooks/'))
            logger_1.default.error('Incomplete or invalid webhook url provided.', 4);
        if (!template.content && template.embeds.length < 1)
            logger_1.default.error('Either content or at least 1 embed is required.', 4);
        return template;
    });
}
exports.default = validateTemplate;
