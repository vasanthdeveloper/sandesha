"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const remove = new commander_1.Command('remove')
    .description('Remove installed webhook templates.')
    .arguments('<template>');
exports.default = remove;
