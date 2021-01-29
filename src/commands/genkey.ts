import { EncryptionKey } from '@meeco/cryppo';
import { Command, flags } from '@oclif/command';
import { handleException } from '../handle-exception';

export default class Genkey extends Command {
  static description =
    'Generate a new encryption key of random bytes with the specified length - printed as url-safe base64';

  static examples = ['cryppo genkey', 'cryppo genkey -l 192'];

  static flags = {
    length: flags.integer({
      char: 'l',
      default: 128,
      description: 'length of the key in bytes to generate: 128, 192 or 256'
    })
  };

  async run() {
    try {
      const { flags } = this.parse(Genkey);

      const { length } = flags;

      if (![128, 192, 256].includes(length / 8)) {
        this.warn(
          `You have specified a key length of ${length} bytes - AES only supports 128, 192 or 256 bit keys`
        );
      }

      const key = EncryptionKey.generateRandom(length);
      this.log('URL-Safe Base64 encoded key:');
      this.log(key.serialize);
    } catch (error) {
      await handleException(error, this);
    }
  }
}
