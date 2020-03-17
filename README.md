cryppo-cli
==========

Meeco encryption library

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cryppo-cli.svg)](https://npmjs.org/package/cryppo-cli)
[![Downloads/week](https://img.shields.io/npm/dw/cryppo-cli.svg)](https://npmjs.org/package/cryppo-cli)
[![License](https://img.shields.io/npm/l/cryppo-cli.svg)](https://github.com/Meeco/cryppo-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cryppo-cli
$ cryppo COMMAND
running command...
$ cryppo (-v|--version|version)
cryppo-cli/0.0.1 darwin-x64 node-v12.4.0
$ cryppo --help [COMMAND]
USAGE
  $ cryppo COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cryppo hello [FILE]`](#cryppo-hello-file)
* [`cryppo help [COMMAND]`](#cryppo-help-command)

## `cryppo hello [FILE]`

describe the command here

```
USAGE
  $ cryppo hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ cryppo hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/Meeco/cryppo-cli/blob/v0.0.1/src/commands/hello.ts)_

## `cryppo help [COMMAND]`

display help for cryppo

```
USAGE
  $ cryppo help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
