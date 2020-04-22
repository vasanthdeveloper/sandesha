#!/usr/bin/env node
//   ___    __________   |  Vasanth Developer (Vasanth Srivatsa)
//   __ |  / /___  __ \  |  ------------------------------------------------
//   __ | / / __  / / /  |  https://github.com/vasanthdeveloper/sandesha.git
//   __ |/ /  _  /_/ /   |
//   _____/   /_____/    |  Entryfile for sandesha project
//                       |

import { createPaths } from './paths'
import app from './commands'

async function main(): Promise<void> {
    await createPaths()
    app.parse(process.argv)
}

main()