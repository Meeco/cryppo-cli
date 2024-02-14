import { Command, Flags } from '@oclif/core';
import { writeFile } from 'node:fs';
import { promisify } from 'node:util';

import cryppo from '../../cryppo-wrapper';
import { handleException } from '../../handle-exception';

export default class Genkeypair extends Command {
  static args = {};

  static description = 'Generate a new RSA key pair, writing the private and public keys to files.';

  static examples = ['cryppo genkeypair -p private.pem -P public.pem'];

  static flags = {
    bits: Flags.integer({ char: 'b', default: 4096, description: 'RSA key size' }),
    privateKeyOut: Flags.string({
      char: 'p',
      description: 'Private key output path',
      required: true
    }),
    publicKeyOut: Flags.string({
      char: 'P',
      description: 'Public key output path',
      required: true
    })
  };

  async run(): Promise<void> {
    try {
      const write = promisify(writeFile);

      const { flags } = await this.parse(Genkeypair);
      const { bits, privateKeyOut, publicKeyOut } = flags;

      const pair = await cryppo.generateRSAKeyPair(bits);
      await write(privateKeyOut, pair.privateKey);
      await write(publicKeyOut, pair.publicKey);

      this.log(`Private key written to ${privateKeyOut}`);
      this.log(`Public key written to ${publicKeyOut}`);
    } catch (error) {
      await handleException(error, this);
    }
  }
}
