"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const list = new commander_1.Command('list')
    .description('List all installed webhook templates.');
exports.default = list;
