"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const send = new commander_1.Command('send')
    .description('Send a webhook to discord.')
    .arguments('<template>')
    .option('--no-stdin', 'dont\'t read from standard input');
exports.default = send;
