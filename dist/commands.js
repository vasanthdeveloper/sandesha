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
const commander_1 = require("commander");
const send_1 = __importDefault(require("./cmd/send"));
const send_2 = __importDefault(require("./tasks/send"));
const app = new commander_1.Command('sandesha');
const packageJson = require('../package.json');
const commands = {
    send: {
        cmd: send_1.default,
        task: send_2.default
    }
};
app.option('-v, --verbose', 'Show additional information to stdout.');
app.helpOption('-h, --help', 'Show the help message and terminate.');
app.version(`sandesha v${packageJson.version}`, '-V, --version', 'Show the version information and terminate.');
Object.keys(commands).forEach((cmdName) => {
    const cmd = commands[cmdName].cmd;
    cmd.action((args, command) => __awaiter(void 0, void 0, void 0, function* () {
        yield commands[cmdName].task(args, command, app.opts());
    }));
    app.addCommand(cmd);
});
exports.default = app;
