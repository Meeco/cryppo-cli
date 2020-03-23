Cryppo CLI

==========

Meeco encryption library

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cryppo-cli.svg)](https://npmjs.org/package/cryppo-cli)
[![Downloads/week](https://img.shields.io/npm/dw/cryppo-cli.svg)](https://npmjs.org/package/cryppo-cli)
[![License](https://img.shields.io/npm/l/cryppo-cli.svg)](https://github.com/Meeco/cryppo-cli/blob/master/package.json)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

# Usage

## Basic example:

```sh
$ cryppo genkey
vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk=
$ cryppo encrypt -v "hello world" -k vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk=
Aes256Gcm.gSAByGMq4edzM0U=.LS0tCml2OiAhYmluYXJ5IHwtCiAgaW1QL09qMWZ6eWw0cmwwSgphdDogIWJpbmFyeSB8LQogIE5SbjZUQXJ2bitNS1Z5M0FpZEpmWlE9PQphZDogbm9uZQo=
$ cryppo decrypt -s "Aes256Gcm.gSAByGMq4edzM0U=.LS0tCml2OiAhYmluYXJ5IHwtCiAgaW1QL09qMWZ6eWw0cmwwSgphdDogIWJpbmFyeSB8LQogIE5SbjZUQXJ2bitNS1Z5M0FpZEpmWlE9PQphZDogbm9uZQo=" -k vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk=
hello world
```

<!-- usage -->

```sh-session
$ npm install -g cryppo-cli
$ cryppo COMMAND
running command...
$ cryppo (-v|--version|version)
cryppo-cli/0.0.1 darwin-x64 node-v10.16.0
$ cryppo --help [COMMAND]
USAGE
  $ cryppo COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`cryppo decrypt`](#cryppo-decrypt)
- [`cryppo encrypt`](#cryppo-encrypt)
- [`cryppo genkey`](#cryppo-genkey)
- [`cryppo help [COMMAND]`](#cryppo-help-command)

## `cryppo decrypt`

Decrypt a serialized encrypted value

```
USAGE
  $ cryppo decrypt

OPTIONS
  -h, --help                   show CLI help
  -k, --key=key                (required) base64 encoded data encryption key
  -s, --serialized=serialized  (required) serialized encrypted value

EXAMPLE
  cryppo decrypt -s
  "Aes256Gcm.gSAByGMq4edzM0U=.LS0tCml2OiAhYmluYXJ5IHwtCiAgaW1QL09qMWZ6eWw0cmwwSgphdDogIWJpbmFyeSB8LQogIE5SbjZUQXJ2bitNS1
  Z5M0FpZEpmWlE9PQphZDogbm9uZQo=" -k vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk=
```

_See code: [src/commands/decrypt.ts](https://github.com/Meeco/cryppo-cli/blob/v0.0.1/src/commands/decrypt.ts)_

## `cryppo encrypt`

Encrypt a serialized encrypted value

```
USAGE
  $ cryppo encrypt

OPTIONS
  -h, --help         show CLI help
  -k, --key=key      (required) base64 encoded data encryption key
  -v, --value=value  (required) value to encrypt

EXAMPLE
  encrypt -v "hello world" -k vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk=
```

_See code: [src/commands/encrypt.ts](https://github.com/Meeco/cryppo-cli/blob/v0.0.1/src/commands/encrypt.ts)_

## `cryppo genkey`

Generate a new (random) encryption key - printed as base64 encoded

```
USAGE
  $ cryppo genkey

OPTIONS
  -l, --length=length  length of the key to generate (defaults to 32 - cryppo's default)

EXAMPLES
  cryppo genkey
  cryppo genkey -l 64
```

_See code: [src/commands/genkey.ts](https://github.com/Meeco/cryppo-cli/blob/v0.0.1/src/commands/genkey.ts)_

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
