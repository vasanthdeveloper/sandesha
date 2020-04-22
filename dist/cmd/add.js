"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const add = new commander_1.Command('add')
    .description('Interactively create a new webhook template.');
exports.default = add;
