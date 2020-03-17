import { CipherStrategy, decodeSafe64, encryptWithKey } from '@meeco/cryppo';
import { Command, flags } from '@oclif/command';

export default class Encrypt extends Command {
  static description = 'Encrypt a serialized encrypted value';

  static examples = ['encrypt -v "hello world" -k vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk='];

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    value: flags.string({ char: 'v', description: 'value to encrypt', required: true }),
    key: flags.string({
      char: 'k',
      description: 'base64 encoded data encryption key',
      required: true
    })
  };

  async run() {
    const { flags } = this.parse(Encrypt);
    const { value, key } = flags;
    const decodedKey = decodeSafe64(key);
    const encrypted = await encryptWithKey({
      data: value,
      key: decodedKey,
      strategy: CipherStrategy.AES_GCM
    });
    this.log(encrypted.serialized);
  }
}
