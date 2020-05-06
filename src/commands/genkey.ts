import { encodeSafe64, generateRandomKey } from '@meeco/cryppo';
import { Command, flags } from '@oclif/command';
import { handleException } from '../handle-exception';

export default class Genkey extends Command {
  static description =
    'Generate a new encryption key of random bytes with the specified length - printed as url-safe base64';

  static examples = ['cryppo genkey', 'cryppo genkey -l 16'];

  static flags = {
    length: flags.integer({
      char: 'l',
      default: 32,
      description:
        "length of the key in bytes to generate (defaults to 32 bytes - cryppo's default)"
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

      const key = await generateRandomKey(length);
      this.log('URL-Safe Base64 encoded key:');
      this.log(encodeSafe64(key));
    } catch (error) {
      handleException(error, this);
    }
  }
}
