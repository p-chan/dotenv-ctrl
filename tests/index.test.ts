import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import fs from 'fs'
import shell from 'shelljs'
import * as rimraf from 'rimraf'

beforeEach(() => {
  rimraf.sync('.env*')
})

afterAll(() => {
  rimraf.sync('.env*')
})

describe('add', () => {
  it('basic', () => {
    shell.exec('tsx ./src/index.ts add NODE_ENV production')

    expect(fs.readFileSync('.env', 'utf-8')).toBe('NODE_ENV=production\n')
  })

  it('duplicate', () => {
    shell.exec('tsx ./src/index.ts add NODE_ENV production')
    shell.exec('tsx ./src/index.ts add NODE_ENV development')

    expect(fs.readFileSync('.env', 'utf-8')).toBe('NODE_ENV=production\n')
  })

  it('env option', () => {
    shell.exec('tsx ./src/index.ts add NODE_ENV production --env .env.production')

    expect(fs.readFileSync('.env.production', 'utf-8')).toBe('NODE_ENV=production\n')
  })
})

describe('remove', () => {
  it('basic', () => {
    shell.exec('tsx ./src/index.ts add NODE_ENV production')
    shell.exec('tsx ./src/index.ts remove NODE_ENV')

    expect(fs.readFileSync('.env', 'utf-8')).toBe('')
  })

  it('not found', () => {
    shell.exec('tsx ./src/index.ts add NODE_ENV production')
    shell.exec('tsx ./src/index.ts remove NDENV')

    expect(fs.readFileSync('.env', 'utf-8')).toBe('NODE_ENV=production\n')
  })

  it('env option', () => {
    shell.exec('tsx ./src/index.ts add NODE_ENV production --env .env.production')
    shell.exec('tsx ./src/index.ts remove NODE_ENV --env .env.production')

    expect(fs.readFileSync('.env.production', 'utf-8')).toBe('')
  })
})
