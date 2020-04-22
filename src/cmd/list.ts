// This file configures the list command

import { Command } from 'commander'

const list = new Command('list')
    .description('List all installed webhook templates.')

export default list