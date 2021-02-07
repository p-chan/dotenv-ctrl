# dotenv-ctrl

> A CLI tool to control [dotenv](https://github.com/motdotla/dotenv) file

## Install

```bash
$ npm install dotenv-ctrl --save-dev
```

## Usage

### `add <key> <value>`

```bash
$ npx dotenv-ctrl add NODE_ENV production
$ cat .env
NODE_ENV=production
```

### `remove <key>`

```bash
$ cat .env
NODE_ENV=production
NODE_DELETE_KEY=true
$ npx dotenv-ctrl remove NODE_DELETE_KEY
$ cat .env
NODE_ENV=production
```

## Options

### `-e`, `--env`

```bash
$ npx dotenv-ctrl add NODE_ENV development -e .env.development
$ cat .env.development
NODE_ENV=development
```

## Author

[@p-chan](https://github.com/p-chan)

## License

MIT
