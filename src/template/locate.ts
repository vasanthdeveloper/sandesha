import fs from 'fs'
import path from 'path'

import logger from '../logger'
import paths from '../paths'

export default async function locateTemplate(templateString: string): Promise<string> {
    // convert the template path into an absolute path
    const absolute = path.isAbsolute(templateString)

    // check if the given path is absolute
    if (absolute) {
        // check if it's there
        if (fs.existsSync(`${templateString}.json`)) {
            return templateString
        } else {
            logger.error(`A template with name "${path.basename(templateString)}.json" was not found at ${path.dirname(templateString)}`, 2)
        }
    } else {
        // first resolve the relative path to get an absolute path
        const absolutePath = path.resolve(`${templateString}.json`)
        
        // now check if the relative template exists
        if (fs.existsSync(absolutePath)) {
            return absolutePath
        } else {
            // check if it's a a template name
            const templatePath = path.join(paths.data, `${templateString}.json`)
            if (fs.existsSync(templatePath)) {
                return templatePath
            } else {
                logger.error(`A template with name "${path.basename(templateString)}.json" was not\n      found at ${path.dirname(absolutePath)}\n      and ${paths.data}`, 2)
            }
        }
    }
}