import { Command, CommanderStatic } from 'commander'

import add from './cmd/add'
import list from './cmd/list'
import send from './cmd/send'
import remove from './cmd/remove'

import sendTask from './tasks/send'

const app = new Command('sandesha')
const packageJson = require('../package.json')

// an array of all the sub commands that need to be added
const commands = {
    send: {
        cmd: send,
        task: sendTask
    }
}

// add additional global options
app.option('-v, --verbose', 'Show additional information to stdout.')
app.helpOption('-h, --help', 'Show the help message and terminate.')
app.version(`sandesha v${packageJson.version}`, '-V, --version', 'Show the version information and terminate.')

// loop through all commands, and build a layered
// action function that passes the global options too
Object.keys(commands).forEach((cmdName: string) => {
    const cmd: Command = commands[cmdName].cmd
    cmd.action(async (args: any[], command: CommanderStatic) => {
        await commands[cmdName].task(args, command, app.opts())
    })
    app.addCommand(cmd)
})

export default app