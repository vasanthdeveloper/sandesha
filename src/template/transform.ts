import handlebars from 'handlebars'

import { TemplateImpl } from '../interfaces'

const appInfo = require('../../package.json')

async function parserVariables(template: TemplateImpl, variables: string[]): Promise<TemplateImpl> {
    // convert this string array into object
    const variablesObject = {}

    // loop through our variables object and add them to our
    // variablesObject
    variables.forEach((variable, index) => {
        variablesObject[(index + 1).toString()] = variable
    })

    return JSON.parse(handlebars.compile(JSON.stringify(template))(variablesObject))
}

export default async function transformTemplate(template: TemplateImpl, variables: string[]): Promise<any> {
    const parsed = await parserVariables(template, variables)
    const returnable = {}

    returnable['url'] = parsed.url

    if (parsed.embeds.length > 0) {
        const temp = []
        parsed.embeds.forEach(embed => {
            embed['footer'] = {
                text: `sandesha v${appInfo.version}`
            }

            temp.push(embed)
        })
        returnable['embeds'] = temp
    }

    if (parsed.username)
        returnable['username'] = parsed.username
    
    if (parsed.avatarUrl)
        returnable['avatar_url'] = parsed.avatarUrl
    
    if (parsed.content)
        returnable['content'] = parsed.content
    
    return returnable
}