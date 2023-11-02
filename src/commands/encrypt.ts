import { EncryptionKey, bytesBufferToBinaryString, utf8ToBytes } from '@meeco/cryppo';
import { Command, Flags } from '@oclif/core';

import cryppo from '../cryppo-wrapper';
import { handleException } from '../handle-exception';
import { readFileAsBuffer } from '../util/file';

export default class Encrypt extends Command {
  static args = {};

  static description = 'Encrypt an UTF-8 encoded string with AES or RSA';

  static examples = [
    'encrypt -v "hello world" -k vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk=',
    'encrypt -v "hello world" -P public-key.pem'
  ];

  static flags = {
    help: Flags.help({ char: 'h' }),
    key: Flags.string({
      char: 'k',
      description: 'base64 encoded data encryption key (if encrypting with AES)',
      exclusive: ['publicKeyFile']
    }),
    publicKeyFile: Flags.string({
      char: 'P',
      description: 'public key file (if encrypting with RSA)',
      exclusive: ['key']
    }),
    // flag with a value (-n, --name=VALUE)
    value: Flags.string({ char: 'v', description: 'value to encrypt', required: true })
  };

  async run(): Promise<void> {
    try {
      const { flags } = await this.parse(Encrypt);
      const { key, publicKeyFile, value } = flags;

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
          // Please mind that while `data` in encryptWithKey is a list of bytes, here
          // encryptWithPublicKey still takes a string, and not an array of bytes!
          // This is not good because we can run into our old problems caused by
          // implicit conversions between UTF8 and UTF16! (yl)
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
