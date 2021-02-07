import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

const getEnvFileFullPath = ({ path: envFilePath = '.env' }: { path?: string }) => {
  const cwd = process.cwd()

  return path.resolve(cwd, envFilePath)
}

export const isExist = ({ path: envFilePath = '.env' }: { path?: string }) => {
  return fs.existsSync(getEnvFileFullPath({ path: envFilePath })) ? true : false
}

export const read = ({ path: envFilePath = '.env' }: { path?: string }) => {
  const cwd = process.cwd()

  const { error, parsed } = dotenv.config({
    path: path.resolve(cwd, envFilePath),
  })

  if (error) throw error

  return parsed
}

export const write = ({ path: envFilePath = '.env', data }: { path?: string; data: { [key: string]: string } }) => {
  const cwd = process.cwd()

  const body = Object.entries(data).reduce((prev, [key, value]) => {
    return `${prev}${key}=${value}\n`
  }, '')

  fs.writeFileSync(path.resolve(cwd, envFilePath), body, { encoding: 'utf-8' })
}
