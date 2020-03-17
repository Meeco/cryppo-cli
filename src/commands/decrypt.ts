import { decodeSafe64, decryptWithKey } from '@meeco/cryppo';
import { Command, flags } from '@oclif/command';

export default class Decrypt extends Command {
  static description = 'Decrypt a serialized encrypted value';

  static examples = [
    'cryppo decrypt -s "Aes256Gcm.gSAByGMq4edzM0U=.LS0tCml2OiAhYmluYXJ5IHwtCiAgaW1QL09qMWZ6eWw0cmwwSgphdDogIWJpbmFyeSB8LQogIE5SbjZUQXJ2bitNS1Z5M0FpZEpmWlE9PQphZDogbm9uZQo=" -k vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk='
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    serialized: flags.string({
      char: 's',
      description: 'serialized encrypted value',
      required: true
    }),
    key: flags.string({
      char: 'k',
      description: 'base64 encoded data encryption key',
      required: true
    })
  };

  async run() {
    const { flags } = this.parse(Decrypt);
    const { serialized, key } = flags;
    const decodedKey = decodeSafe64(key);
    const decrypted = await decryptWithKey({ serialized, key: decodedKey });
    this.log(decrypted);
  }
}
