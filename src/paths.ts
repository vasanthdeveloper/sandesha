import mkdir from 'mkdirp'
import envPaths from 'env-paths'

export default envPaths('sandesha',  { suffix: '' })

// this will create the environment directories
export async function createPaths(): Promise<void> {
    const paths = envPaths('sandesha',  { suffix: '' })

    await mkdir(paths.data)
}