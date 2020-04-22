// This file configures the send command

import { Command } from 'commander'

const send = new Command('send')
    .description('Send a webhook to discord.')
    .arguments('<template>')
    .option('--no-stdin', 'dont\'t read from standard input')

export default send