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
const handlebars_1 = __importDefault(require("handlebars"));
const appInfo = require('../../package.json');
function parserVariables(template, variables) {
    return __awaiter(this, void 0, void 0, function* () {
        const variablesObject = {};
        variables.forEach((variable, index) => {
            variablesObject[(index + 1).toString()] = variable;
        });
        return JSON.parse(handlebars_1.default.compile(JSON.stringify(template))(variablesObject));
    });
}
function transformTemplate(template, variables) {
    return __awaiter(this, void 0, void 0, function* () {
        const parsed = yield parserVariables(template, variables);
        const returnable = {};
        returnable['url'] = parsed.url;
        if (parsed.embeds.length > 0) {
            const temp = [];
            parsed.embeds.forEach(embed => {
                embed['footer'] = {
                    text: `sandesha v${appInfo.version}`
                };
                temp.push(embed);
            });
            returnable['embeds'] = temp;
        }
        if (parsed.username)
            returnable['username'] = parsed.username;
        if (parsed.avatarUrl)
            returnable['avatar_url'] = parsed.avatarUrl;
        if (parsed.content)
            returnable['content'] = parsed.content;
        return returnable;
    });
}
exports.default = transformTemplate;
