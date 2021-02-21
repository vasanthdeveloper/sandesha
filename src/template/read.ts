import fs from 'fs'
import path from 'path'

import { TemplateImpl } from '../interfaces'
import logger from '../logger'

export default async function readTemplate(templatePath: string): Promise<any> {
    const templateContents = await fs.promises.readFile(templatePath, { encoding: 'utf-8' }) as string
    
    // these defaultValues are used to validate the template
    const defaultTemplate: TemplateImpl = {
        embeds: [],
        url: null,
        avatarUrl: null,
        content: null,
        username: null,
    }

    try {
        const templateData = JSON.parse(templateContents)

        // loop through all possible config keys, fill the defaults to keys
        // for which the user hasn't specified any value
        for (const obj in defaultTemplate) {
            if (templateData[obj] == undefined)
                templateData[obj] = defaultTemplate[obj]
        }

        // loop through all template keys, check if there is anything else
        // given in the template that isn't supported by us
        for (const obj in templateData) {
            if (defaultTemplate[obj] === undefined)
                logger.error(`Unknown element "${obj}" in ${path.basename(templatePath)} template.`, 3)
        }

        return templateData
    } catch (e) {
        logger.error(`Invalid template "${e.message}"`, 3)
    }
}