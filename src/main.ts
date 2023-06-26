import * as core from '@actions/core'
import {promises as fs} from 'fs'
import path from 'path'

async function run(): Promise<void> {
  try {
    const maxStr = core.getInput('max-files', {required: false})
    const max = parseInt(maxStr, 10) || 100
    const allCalcs = (
      await fs.readdir(path.resolve('src/calculators'), {withFileTypes: true})
    )
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
    const calcs = allCalcs.slice(0, max)
    core.debug(`Calcs: ${calcs.join(',')}`)
    core.setOutput('calcs', calcs)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
