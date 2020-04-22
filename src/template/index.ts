import locateTemplate from './locate'
import readTemplate from './read'
import validateTemplate from './validate'
import transformTemplate from './transform'

export default async function processTemplate(templateString: string, variables: string[]): Promise<any> {
    const templatePath = await locateTemplate(templateString)
    const templateData = await validateTemplate(await readTemplate(templatePath))
    return (await transformTemplate(templateData, variables))
}