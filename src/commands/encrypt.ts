import cryppo from '../cryppo-wrapper';
import { binaryBufferToString } from '@meeco/cryppo/dist/src/util';
import { Command, flags } from '@oclif/command';
import { handleException } from '../handle-exception';
import { readFileAsBuffer } from '../util/file';

export default class Encrypt extends Command {
  static description = 'Encrypt a serialized encrypted value';

  static examples = [
    'encrypt -v "hello world" -k vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk=',
    'encrypt -v "hello world" -P public-key.pem'
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    value: flags.string({ char: 'v', description: 'value to encrypt', required: true }),
    key: flags.string({
      char: 'k',
      description: 'base64 encoded data encryption key (if encrypting with AES)',
      exclusive: ['publicKeyFile']
    }),
    publicKeyFile: flags.string({
      char: 'P',
      description: 'public key file (if encrypting with RSA)',
      exclusive: ['key']
    })
  };

  async run() {
    try {
      const { flags } = this.parse(Encrypt);
      const { value, key, publicKeyFile } = flags;
      if (key) {
        const decodedKey = cryppo.decodeSafe64(key);
        const encrypted = await cryppo.encryptWithKey({
          data: value,
          key: decodedKey,
          strategy: cryppo.CipherStrategy.AES_GCM
        });
        if (encrypted.serialized) {
          this.log(encrypted.serialized);
        }
      } else if (publicKeyFile) {
        const publicKeyPem = binaryBufferToString(await readFileAsBuffer(publicKeyFile));
        const encrypted = await cryppo.encryptWithPublicKey({
          data: value,
          publicKeyPem
        });
        this.log(encrypted.serialized);
      } else {
        this.error(
          'Must specify either base-64 encoded encryption key or RSA public key file path'
        );
      }
    } catch (error) {
      await handleException(error, this);
    }
  }
}
