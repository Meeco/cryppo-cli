import { encodeSafe64, generateRandomKey } from '@meeco/cryppo';
import { Command, flags } from '@oclif/command';

export default class Genkey extends Command {
  static description = 'Generate a new (random) encryption key - printed as base64 encoded';

  static examples = ['cryppo genkey', 'cryppo genkey -l 64'];

  static flags = {
    length: flags.integer({
      char: 'l',
      description: "length of the key to generate (defaults to 32 - cryppo's default)"
    })
  };

  async run() {
    const { flags } = this.parse(Genkey);

    const { length } = flags;
    const key = await generateRandomKey(length);
    this.log('URL-Safe Base64 encoded key:');
    this.log(encodeSafe64(key));
  }
}
