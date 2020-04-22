// This file configures the remove command

import { Command } from 'commander'

const remove = new Command('remove')
    .description('Remove installed webhook templates.')
    .arguments('<template>')

export default remove