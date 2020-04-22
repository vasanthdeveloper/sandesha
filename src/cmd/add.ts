// This file configures the add command

import { Command } from 'commander'

const add = new Command('add')
    .description('Interactively create a new webhook template.')

export default add