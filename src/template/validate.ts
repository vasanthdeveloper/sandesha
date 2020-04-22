import urlParse from 'url-parse'

import logger from '../logger'

import { TemplateImpl } from '../interfaces'

export default async function validateTemplate(template: TemplateImpl): Promise<TemplateImpl> {
    // check if the template has a proper discord webhook url
    if (!template.url)
        logger.error('A template url was not provided.', 4)
    
    // parse the URL
    const parsed = urlParse(template.url)
    if (parsed.protocol != 'https:')
        logger.error(`Webhook url with protocol "${parsed.protocol}" is not secure`, 4)
    
    if (parsed.host != 'discordapp.com')
        logger.error('This webhook doesn\'t resolve to discord', 4)
    
    if (!parsed.pathname.startsWith('/api/webhooks/'))
        logger.error('Incomplete or invalid webhook url provided.', 4)

    // check if there is either 1 webhook embed or the content field
    if (!template.content && template.embeds.length < 1)
        logger.error('Either content or at least 1 embed is required.', 4)

    return template
}