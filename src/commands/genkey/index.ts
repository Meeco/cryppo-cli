import { EncryptionKey } from '@meeco/cryppo';
import { Command, Flags } from '@oclif/core';

import { handleException } from '../../handle-exception';

export default class Genkey extends Command {
  static args = {};

  static description =
    'Generate a new encryption key of random bytes with the specified length - printed as url-safe base64.';

  static examples = ['cryppo genkey', 'cryppo genkey -l 192'];

  static flags = {
    length: Flags.integer({
      char: 'l',
      default: 256,
      description: 'length of the key in bytes to generate: 128, 192 or 256'
    })
  };

  async run(): Promise<void> {
    try {
      const { flags } = await this.parse(Genkey);
      const { length } = flags;

      if ([128, 192, 256].includes(length)) {
        const key = EncryptionKey.generateRandom(length / 8);
        this.log(`${length}-bit URL-Safe Base64 encoded key:`);
        this.log(key.serialize);
      } else {
        this.warn(
          `You have specified a key length of ${length} bytes - AES only supports 128, 192 or 256 bit keys`
        );
      }
    } catch (error) {
      await handleException(error, this);
    }
  }
}
