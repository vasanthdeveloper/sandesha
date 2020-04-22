// This file sends the webhook to Discord
// provided it has all the required information

import { CommanderStatic } from 'commander'
import axios from 'axios'

import processTemplate from '../template/index'
import logger from '../logger'

function streamToString(stream: NodeJS.ReadStream): Promise<string> {
    const chunks: Buffer[] = []
    
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk))
        stream.on('error', e => { reject(e) })
        stream.on('end', () =>  resolve(Buffer.concat(chunks).toString('UTF-8')))
    })
}

export default async function send(templateString: string, command: CommanderStatic, globalOptions: any): Promise<void> {
    // read the options passed to this command
    const options = command.opts()

    // the variables that contains variables
    let variables: string[] = []

    // read from stdin only if the user wants to
    if (options.stdin == true) {
        logger.info('Reading data from stdin')
        const inputString = await streamToString(process.stdin)
        logger.okay('Finished reading data from stdin')

        variables = inputString.trim().replace(/ ~ /g, '~')
            .replace('\n', '~')
            .split('~')
    } else {
        logger.verbose('Skipped reading data from stdin')
    }

    // now process the template
    const template = await processTemplate(templateString, variables)
    const url = template.url as string
    delete template.url

    // let's send the webhook!
    try {
        const sent = await axios.post(url, template)
    } catch (e) {
        logger.error(`Failed to send the webhook with "${e.message}".`)
    }
}