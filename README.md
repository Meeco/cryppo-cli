# Cryppo CLI

<img width="100px" src="https://uploads-ssl.webflow.com/5cd5168c6c861f4fc7cfe969/5ddcaba04d724676d8758927_Meeco-Logo-2019-Circle-RGB.svg">

Meeco Encryption Library CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cryppo-cli.svg)](https://npmjs.org/package/cryppo-cli)
[![Downloads/week](https://img.shields.io/npm/dw/cryppo-cli.svg)](https://npmjs.org/package/cryppo-cli)
[![License](https://img.shields.io/npm/l/cryppo-cli.svg)](https://github.com/Meeco/cryppo-cli/blob/master/package.json)

<!-- toc -->

- [Cryppo CLI](#cryppo-cli)
<!-- tocstop -->

## Installation

1. Download the gzip file appriate for your system from the [releases page](https://github.com/Meeco/cryppo-cli/releases).
2. Unzip the downloaded file to a destination of your choosing.
3. Open up a terminal window inside the extracted `cryppo` folder.
4. Change directory to the `bin` folder.
5. Test that everything is working correctly by running the command `./cryppo genkey`.
6. Optionally on Mac or Linux add an alias to the cryppo executeable with `echo "alias cryppo=\"${PWD}/cryppo\"" >> ~/.zshrc`. (if you are not
   using zshell replace `.zshrc` with `.bash_profile` or `.bashrc` or whatever your system uses https://www.linuxjournal.com/content/profiles-and-rc-files)
7. Open a new terminal window and you should be able to now use the `cryppo` command from anywhere and you'll no longer need to reference it relatively.

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
cryppo-cli/2.0.0 darwin-arm64 node-v18.16.0
$ cryppo --help [COMMAND]
USAGE
  $ cryppo COMMAND
...
```

<!-- usagestop -->

## Commands

<!-- commands -->

- [`cryppo decrypt`](#cryppo-decrypt)
- [`cryppo encrypt`](#cryppo-encrypt)
- [`cryppo genkey`](#cryppo-genkey)
- [`cryppo genkeypair`](#cryppo-genkeypair)
- [`cryppo help [COMMANDS]`](#cryppo-help-commands)
- [`cryppo sign DESTINATION FILE`](#cryppo-sign-destination-file)
- [`cryppo verify DESTINATION FILE`](#cryppo-verify-destination-file)

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

_See code: [src/commands/decrypt.ts](https://github.com/Meeco/cryppo-cli/blob/v2.0.0/src/commands/decrypt.ts)_

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

_See code: [src/commands/encrypt.ts](https://github.com/Meeco/cryppo-cli/blob/v2.0.0/src/commands/encrypt.ts)_

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

_See code: [src/commands/genkey.ts](https://github.com/Meeco/cryppo-cli/blob/v2.0.0/src/commands/genkey.ts)_

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

_See code: [src/commands/genkeypair.ts](https://github.com/Meeco/cryppo-cli/blob/v2.0.0/src/commands/genkeypair.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.5/src/commands/help.ts)_

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

_See code: [src/commands/sign.ts](https://github.com/Meeco/cryppo-cli/blob/v2.0.0/src/commands/sign.ts)_

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

_See code: [src/commands/verify.ts](https://github.com/Meeco/cryppo-cli/blob/v2.0.0/src/commands/verify.ts)_

<!-- commandsstop -->
