# Cryppo CLI

<img width="100px" src="https://uploads-ssl.webflow.com/5cd5168c6c861f4fc7cfe969/5ddcaba04d724676d8758927_Meeco-Logo-2019-Circle-RGB.svg">

Meeco Encryption Library CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cryppo-cli.svg)](https://npmjs.org/package/cryppo-cli)
[![Downloads/week](https://img.shields.io/npm/dw/cryppo-cli.svg)](https://npmjs.org/package/cryppo-cli)
[![License](https://img.shields.io/npm/l/cryppo-cli.svg)](https://github.com/Meeco/cryppo-cli/blob/master/package.json)

<!-- toc -->
* [Cryppo CLI](#cryppo-cli)
* [Usage](#usage)
* [Commands](#commands)
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

RSA

```
$ cryppo genkeypair -p private.pem -P public.pem
$ cryppo encrypt -v "hello world" -P public.pem
$ cryppo decrypt -s <result of previous command> -p private.pem
$ cryppo sign -p private.pem myfile.txt myfile.signed.txt
$ cryppo verify -P public.pem myfile.signed.txt myfile.txt
```

<!-- usage -->
```sh-session
$ npm install -g cryppo-cli
$ cryppo COMMAND
running command...
$ cryppo (-v|--version|version)
cryppo-cli/0.2.0 darwin-x64 node-v13.12.0
$ cryppo --help [COMMAND]
USAGE
  $ cryppo COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`cryppo decrypt`](#cryppo-decrypt)
* [`cryppo encrypt`](#cryppo-encrypt)
* [`cryppo genkey`](#cryppo-genkey)
* [`cryppo genkeypair`](#cryppo-genkeypair)
* [`cryppo help [COMMAND]`](#cryppo-help-command)
* [`cryppo sign FILE DESTINATION`](#cryppo-sign-file-destination)
* [`cryppo verify FILE DESTINATION`](#cryppo-verify-file-destination)

## `cryppo decrypt`

Decrypt a serialized encrypted value

```
USAGE
  $ cryppo decrypt

OPTIONS
  -h, --help                           show CLI help
  -k, --key=key                        base64 encoded data encryption key
  -p, --privateKeyFile=privateKeyFile  private key file (if encrypting with RSA)
  -s, --serialized=serialized          (required) serialized encrypted value

EXAMPLES
  cryppo decrypt -s 
  "Aes256Gcm.gSAByGMq4edzM0U=.LS0tCml2OiAhYmluYXJ5IHwtCiAgaW1QL09qMWZ6eWw0cmwwSgphdDogIWJpbmFyeSB8LQogIE5SbjZUQXJ2bitNS1
  Z5M0FpZEpmWlE9PQphZDogbm9uZQo=" -k vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk=
  cryppo decrypt -s "Rsa4096.bJjV2g_RBZKeyqBr-dSjPAc3qtkTgd0=.LS0tCnt9Cg==" -p private.pem
```

_See code: [src/commands/decrypt.ts](https://github.com/Meeco/cryppo-cli/blob/v0.2.0/src/commands/decrypt.ts)_

## `cryppo encrypt`

Encrypt a serialized encrypted value

```
USAGE
  $ cryppo encrypt

OPTIONS
  -P, --publicKeyFile=publicKeyFile  public key file (if encrypting with RSA)
  -h, --help                         show CLI help
  -k, --key=key                      base64 encoded data encryption key (if encrypting with AES)
  -v, --value=value                  (required) value to encrypt

EXAMPLES
  encrypt -v "hello world" -k vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk=
  encrypt -v "hello world" -P public-key.pem
```

_See code: [src/commands/encrypt.ts](https://github.com/Meeco/cryppo-cli/blob/v0.2.0/src/commands/encrypt.ts)_

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

_See code: [src/commands/genkey.ts](https://github.com/Meeco/cryppo-cli/blob/v0.2.0/src/commands/genkey.ts)_

## `cryppo genkeypair`

Generate a new RSA key pair, writing the private and public keys to files.

```
USAGE
  $ cryppo genkeypair

OPTIONS
  -P, --publicKeyOut=publicKeyOut    (required) Public key output path
  -b, --bits=bits                    [default: 4096] RSA key size
  -p, --privateKeyOut=privateKeyOut  (required) Private key output path

EXAMPLE
  cryppo genkeypair -p private.pem -P public.pem
```

_See code: [src/commands/genkeypair.ts](https://github.com/Meeco/cryppo-cli/blob/v0.2.0/src/commands/genkeypair.ts)_

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

## `cryppo sign FILE DESTINATION`

Sign a file with an RSA private key and write the signed contents to a new file

```
USAGE
  $ cryppo sign FILE DESTINATION

ARGUMENTS
  FILE         File to sign
  DESTINATION  file to write the resulting signed content to

OPTIONS
  -p, --privateKeyFile=privateKeyFile  (required) path to the private key file

EXAMPLE
  cryppo sign -p private.pem my_file.txt my_file.signed.txt
```

_See code: [src/commands/sign.ts](https://github.com/Meeco/cryppo-cli/blob/v0.2.0/src/commands/sign.ts)_

## `cryppo verify FILE DESTINATION`

Verify an RSA signed file and write the contents to another file.

```
USAGE
  $ cryppo verify FILE DESTINATION

ARGUMENTS
  FILE         Signed file contents to verify
  DESTINATION  File to write the resulting verified content to

OPTIONS
  -P, --publicKeyFile=publicKeyFile  (required) path to the public key file

EXAMPLE
  cryppo verify -P public.pem my_file.signed.txt my_file.txt
```

_See code: [src/commands/verify.ts](https://github.com/Meeco/cryppo-cli/blob/v0.2.0/src/commands/verify.ts)_
<!-- commandsstop -->
