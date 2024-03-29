import { EncryptionKey, bytesBufferToBinaryString } from '@meeco/cryppo';
import { Command, Flags } from '@oclif/core';

import cryppo from '../../cryppo-wrapper';
import { handleException } from '../../handle-exception';
import { readFileAsBuffer } from '../../util/file';

export default class Decrypt extends Command {
  static args = {};

  static description = 'Decrypt a serialized encrypted value with AES or RSA.';

  static examples = [
    'cryppo decrypt -s "Aes256Gcm.gSAByGMq4edzM0U=.LS0tCml2OiAhYmluYXJ5IHwtCiAgaW1QL09qMWZ6eWw0cmwwSgphdDogIWJpbmFyeSB8LQogIE5SbjZUQXJ2bitNS1Z5M0FpZEpmWlE9PQphZDogbm9uZQo=" -k vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk=',
    'cryppo decrypt -s "Rsa4096.bJjV2g_RBZKeyqBr-dSjPAc3qtkTgd0=.LS0tCnt9Cg==" -p private.pem'
  ];

  static flags = {
    help: Flags.help({ char: 'h' }),
    key: Flags.string({
      char: 'k',
      description: 'base64 encoded data encryption key',
      exclusive: ['privateKeyFile']
    }),
    privateKeyFile: Flags.string({
      char: 'p',
      description: 'private key file (if encrypting with RSA)',
      exclusive: ['key']
    }),
    // flag with a value (-n, --name=VALUE)
    serialized: Flags.string({
      char: 's',
      description: 'serialized encrypted value',
      required: true
    })
  };

  async run(): Promise<void> {
    try {
      const { flags } = await this.parse(Decrypt);
      const { key, privateKeyFile, serialized } = flags;
      if (key) {
        const decodedKey = EncryptionKey.fromSerialized(key);
        const decrypted = await cryppo.decryptWithKey({ key: decodedKey, serialized });
        if (decrypted) {
          this.log(bytesBufferToBinaryString(decrypted));
        }
      } else if (privateKeyFile) {
        const privateKeyPem = bytesBufferToBinaryString(await readFileAsBuffer(privateKeyFile));
        const decrypted = await cryppo.decryptSerializedWithPrivateKey({
          privateKeyPem,
          serialized
        });
        this.log(decrypted);
      } else {
        this.error(
          'Must specify either base-64 encoded encryption key or RSA private key file path'
        );
      }
    } catch (error) {
      await handleException(error, this);
    }
  }
}
