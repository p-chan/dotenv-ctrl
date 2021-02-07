import dotenv from 'dotenv'
import fs from 'fs'

export const isExist = ({ path: envFilePath }: { path: string }) => {
  return fs.existsSync(envFilePath) ? true : false
}

export const read = ({ path: envFilePath }: { path: string }) => {
  const { error, parsed } = dotenv.config({
    path: envFilePath,
  })

  if (error) throw error

  return parsed
}

export const write = ({ path: envFilePath, data }: { path: string; data: { [key: string]: string } }) => {
  const body = Object.entries(data).reduce((prev, [key, value]) => {
    return `${prev}${key}=${value}\n`
  }, '')

  fs.writeFileSync(envFilePath, body, { encoding: 'utf-8' })
}
