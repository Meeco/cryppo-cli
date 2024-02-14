# Cryppo CLI

<img width="100px" src="https://uploads-ssl.webflow.com/5cd5168c6c861f4fc7cfe969/5ddcaba04d724676d8758927_Meeco-Logo-2019-Circle-RGB.svg">

Meeco Encryption Library CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![License](https://img.shields.io/npm/l/cryppo-cli.svg)](https://github.com/Meeco/cryppo-cli/blob/master/package.json)

## Installation

You can install this package in 3 different ways:

1. Use installers for MacOS or Windows from the [releases page](https://github.com/Meeco/cryppo-cli/releases).
   You don't need to have Node on your system to run Cryppo, the package already contains Node.
3. Use tarballs with prebuilt packages for you OS and hardware platform from
   [releases page](https://github.com/Meeco/cryppo-cli/releases).You don't need to have Node on your system to run
   Cryppo, the package already contains Node.
2. As a regular NPM package. You need to have Node on your system to run it

### Installers for MacOS or Windows

1. Download an installer for your OS and your platform from the [releases page](https://github.com/Meeco/cryppo-cli/releases).
   For example, for MacOS on Apple Silicon the installer might look like `cryppo-v2.1.0-78d2298-arm64.pkg`
2. Double-click on the installer and follow instruction
2. Open a terminal. The `cryppo` command should be in the path. Check it by running `cryppo` or `cryppo genkey`

### Tarballs for MacOS, Windows, or Linux

1. Download a gzip file appriate for your system from the [releases page](https://github.com/Meeco/cryppo-cli/releases).
   For example, for MacOS on Apple Silicon the installer might look like `cryppo-v2.1.0-413e854-linux-arm64.tar.gz`
2. Unzip the file: `tar xvfz cryppo-v2.1.0-413e854-linux-arm64.tar.gz`
3. Change to directory with Cryppo `cd ./cryppo`
4. Test by running `./bin/cryppo genkey` or `./bin/cryppo`

### An NPM Package

0. Make sure you have `node` and `yarn` installed
1. Clone Cryppo-CLI: `git clone https://github.com/Meeco/cryppo-cli.git`
2. `cd cryppo-cli`
3. Install dependencies: `yarn install`
4. Build the project: `yarn run build`
5. Test by running `./bin/cryppo genkey` or `./bin/cryppo`

## Usage

### Basic example:

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
$ cryppo (--version)
cryppo-cli/2.1.0 darwin-arm64 node-v20.11.0
$ cryppo --help [COMMAND]
USAGE
  $ cryppo COMMAND
...
```
<!-- usagestop -->

## Commands

<!-- commands -->
* [`cryppo decrypt`](#cryppo-decrypt)
* [`cryppo encrypt`](#cryppo-encrypt)
* [`cryppo genkey`](#cryppo-genkey)
* [`cryppo genkeypair`](#cryppo-genkeypair)
* [`cryppo help [COMMANDS]`](#cryppo-help-commands)
* [`cryppo sign DESTINATION FILE`](#cryppo-sign-destination-file)
* [`cryppo verify DESTINATION FILE`](#cryppo-verify-destination-file)

## `cryppo decrypt`

Decrypt a serialized encrypted value with AES or RSA.

```
USAGE
  $ cryppo decrypt -s <value> [-h] [-k <value> | -p <value>]

FLAGS
  -h, --help                    Show CLI help.
  -k, --key=<value>             base64 encoded data encryption key
  -p, --privateKeyFile=<value>  private key file (if encrypting with RSA)
  -s, --serialized=<value>      (required) serialized encrypted value

DESCRIPTION
  Decrypt a serialized encrypted value with AES or RSA.

EXAMPLES
  $ cryppo decrypt -s "Aes256Gcm.gSAByGMq4edzM0U=.LS0tCml2OiAhYmluYXJ5IHwtCiAgaW1QL09qMWZ6eWw0cmwwSgphdDogIWJpbmFyeSB8LQogIE5SbjZUQXJ2bitNS1Z5M0FpZEpmWlE9PQphZDogbm9uZQo=" -k vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk=

  $ cryppo decrypt -s "Rsa4096.bJjV2g_RBZKeyqBr-dSjPAc3qtkTgd0=.LS0tCnt9Cg==" -p private.pem
```

_See code: [src/commands/decrypt/index.ts](https://github.com/Meeco/cryppo-cli/blob/v2.1.0/src/commands/decrypt/index.ts)_

## `cryppo encrypt`

Encrypt an UTF-8 encoded string with AES or RSA

```
USAGE
  $ cryppo encrypt -v <value> [-h] [-k <value> | -P <value>]

FLAGS
  -P, --publicKeyFile=<value>  public key file (if encrypting with RSA)
  -h, --help                   Show CLI help.
  -k, --key=<value>            base64 encoded data encryption key (if encrypting with AES)
  -v, --value=<value>          (required) value to encrypt

DESCRIPTION
  Encrypt an UTF-8 encoded string with AES or RSA

EXAMPLES
  encrypt -v "hello world" -k vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk=

  encrypt -v "hello world" -P public-key.pem
```

_See code: [src/commands/encrypt/index.ts](https://github.com/Meeco/cryppo-cli/blob/v2.1.0/src/commands/encrypt/index.ts)_

## `cryppo genkey`

Generate a new encryption key of random bytes with the specified length - printed as url-safe base64.

```
USAGE
  $ cryppo genkey [-l <value>]

FLAGS
  -l, --length=<value>  [default: 256] length of the key in bytes to generate: 128, 192 or 256

DESCRIPTION
  Generate a new encryption key of random bytes with the specified length - printed as url-safe base64.

EXAMPLES
  $ cryppo genkey

  $ cryppo genkey -l 192
```

_See code: [src/commands/genkey/index.ts](https://github.com/Meeco/cryppo-cli/blob/v2.1.0/src/commands/genkey/index.ts)_

## `cryppo genkeypair`

Generate a new RSA key pair, writing the private and public keys to files.

```
USAGE
  $ cryppo genkeypair -p <value> -P <value> [-b <value>]

FLAGS
  -P, --publicKeyOut=<value>   (required) Public key output path
  -b, --bits=<value>           [default: 4096] RSA key size
  -p, --privateKeyOut=<value>  (required) Private key output path

DESCRIPTION
  Generate a new RSA key pair, writing the private and public keys to files.

EXAMPLES
  $ cryppo genkeypair -p private.pem -P public.pem
```

_See code: [src/commands/genkeypair/index.ts](https://github.com/Meeco/cryppo-cli/blob/v2.1.0/src/commands/genkeypair/index.ts)_

## `cryppo help [COMMANDS]`

Display help for cryppo.

```
USAGE
  $ cryppo help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for cryppo.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.12/src/commands/help.ts)_

## `cryppo sign DESTINATION FILE`

Sign a file with an RSA private key and write the signed contents to a new file.

```
USAGE
  $ cryppo sign DESTINATION FILE -p <value>

ARGUMENTS
  DESTINATION  File to write the resulting signed content to
  FILE         File to sign

FLAGS
  -p, --privateKeyFile=<value>  (required) path to the private key file

DESCRIPTION
  Sign a file with an RSA private key and write the signed contents to a new file.

EXAMPLES
  $ cryppo sign -p private.pem my_file.txt my_file.signed.txt
```

_See code: [src/commands/sign/index.ts](https://github.com/Meeco/cryppo-cli/blob/v2.1.0/src/commands/sign/index.ts)_

## `cryppo verify DESTINATION FILE`

Verify an RSA signed file and write the contents to another file.

```
USAGE
  $ cryppo verify DESTINATION FILE -P <value>

ARGUMENTS
  DESTINATION  File to write the resulting verified content to
  FILE         Signed file contents to verify

FLAGS
  -P, --publicKeyFile=<value>  (required) path to the public key file

DESCRIPTION
  Verify an RSA signed file and write the contents to another file.

EXAMPLES
  $ cryppo verify -P public.pem my_file.signed.txt my_file.txt
```

_See code: [src/commands/verify/index.ts](https://github.com/Meeco/cryppo-cli/blob/v2.1.0/src/commands/verify/index.ts)_
<!-- commandsstop -->
