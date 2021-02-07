#!/usr/bin/env node

import { cac } from 'cac'

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
      const keyValueObject = toObject({ key, value })

      if (!isExist({ path: options.e })) {
        write({
          path: options.e,
          data: keyValueObject,
        })

        return process.exit(0)
      }

      const parsed = read({ path: options.e })

      if (parsed == undefined) throw new Error('dotenv is undefined')
      if (parsed[key]) throw new Error(`${key} is already`)

      write({
        path: options.e,
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
      if (!isExist({ path: options.e })) {
        throw new Error(`${options.e} is not found`)
      }

      const parsed = read({ path: options.e })

      if (parsed == undefined) throw new Error('dotenv is undefined')
      if (parsed[key] == undefined) throw new Error(`${key} is not found`)

      delete parsed[key]

      write({
        path: options.e,
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
