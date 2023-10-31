import { bytesBufferToBinaryString, EncryptionKey, utf8ToBytes } from '@meeco/cryppo';
import { Command, Flags } from '@oclif/core';
import cryppo from '../cryppo-wrapper';
import { handleException } from '../handle-exception';
import { readFileAsBuffer } from '../util/file';

export default class Encrypt extends Command {
  static description = 'Encrypt a value (assumed to be UTF-8 encoded string).';

  static examples = [
    'encrypt -v "hello world" -k vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk=',
    'encrypt -v "hello world" -P public-key.pem'
  ];

  static flags = {
    help: Flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    value: Flags.string({ char: 'v', description: 'value to encrypt', required: true }),
    key: Flags.string({
      char: 'k',
      description: 'base64 encoded data encryption key (if encrypting with AES)',
      exclusive: ['publicKeyFile']
    }),
    publicKeyFile: Flags.string({
      char: 'P',
      description: 'public key file (if encrypting with RSA)',
      exclusive: ['key']
    })
  };

  static args = {};

  async run(): Promise<void> {
    try {
      const { flags } = await this.parse(Encrypt);
      const { value, key, publicKeyFile } = flags;

      if (key) {
        const decodedKey = EncryptionKey.fromSerialized(key);
        const encrypted = await cryppo.encryptWithKey({
          data: utf8ToBytes(value),
          key: decodedKey,
          strategy: cryppo.CipherStrategy.AES_GCM
        });
        if (encrypted.serialized) {
          this.log(encrypted.serialized);
        }
      } else if (publicKeyFile) {
        const publicKeyPem = bytesBufferToBinaryString(await readFileAsBuffer(publicKeyFile));
        const encrypted = await cryppo.encryptWithPublicKey({
          data: utf8ToBytes(value),
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
