#!/usr/bin/env node

import { cac } from 'cac'
import path from 'path'

import { version } from './version'
import { isExist, read, write } from './dotenv'
import { toObject } from './utils'

type Options = {
  '--': any[]
  e?: string
  env?: string
}

const cli = cac()

cli
  .command('add <key> <value>', 'Add secret to dotenv')
  .option('-e,--env <path>', '')
  .example((name) => {
    return `${name} NODE_ENV $PRODUCTION_NODE_ENV`
  })
  .action(async (key: string, value: string, options: Options) => {
    try {
      const envFilePath = path.resolve(process.cwd(), options.e || '.env')
      const keyValueObject = toObject({ key, value })

      if (!isExist({ path: envFilePath })) {
        write({
          path: envFilePath,
          data: keyValueObject,
        })

        return process.exit(0)
      }

      const parsed = read({ path: envFilePath })

      if (parsed == undefined) throw new Error('dotenv is undefined')
      if (parsed[key]) throw new Error(`${key} is already`)

      write({
        path: envFilePath,
        data: {
          ...parsed,
          ...keyValueObject,
        },
      })

      return process.exit(0)
    } catch (error) {
      console.error(error)

      return process.exit(1)
    }
  })

cli
  .command('remove <key>', 'Remove secret from dotenv')
  .option('-e,--env <path>', '')
  .example((name) => {
    return `${name} NODE_ENV`
  })
  .action(async (key: string, options: Options) => {
    try {
      const envFilePath = path.resolve(process.cwd(), options.e || '.env')

      if (!isExist({ path: envFilePath })) {
        throw new Error(`${envFilePath} is not found`)
      }

      const parsed = read({ path: envFilePath })

      if (parsed == undefined) throw new Error('dotenv is undefined')
      if (parsed[key] == undefined) throw new Error(`${key} is not found`)

      delete parsed[key]

      write({
        path: envFilePath,
        data: parsed,
      })

      return process.exit(0)
    } catch (error) {
      console.error(error)

      return process.exit(1)
    }
  })

cli.version(version)
cli.help()

cli.parse()
