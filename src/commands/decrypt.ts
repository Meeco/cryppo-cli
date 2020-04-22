import { decodeSafe64, decryptSerializedWithPrivateKey, decryptWithKey } from '@meeco/cryppo';
import { binaryBufferToString } from '@meeco/cryppo/dist/src/util';
import { Command, flags } from '@oclif/command';
import { readFile } from 'fs';
import { promisify } from 'util';

const read = promisify(readFile);

export default class Decrypt extends Command {
  static description = 'Decrypt a serialized encrypted value';

  static examples = [
    'cryppo decrypt -s "Aes256Gcm.gSAByGMq4edzM0U=.LS0tCml2OiAhYmluYXJ5IHwtCiAgaW1QL09qMWZ6eWw0cmwwSgphdDogIWJpbmFyeSB8LQogIE5SbjZUQXJ2bitNS1Z5M0FpZEpmWlE9PQphZDogbm9uZQo=" -k vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk=',
    'cryppo decrypt -s "Rsa4096.bJjV2g_RBZKeyqBr-dSjPAc3qtkTgd0=.LS0tCnt9Cg==" -p private.pem'
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
      exclusive: ['privateKeyFile']
    }),
    privateKeyFile: flags.string({
      char: 'p',
      description: 'private key file (if encrypting with RSA)',
      exclusive: ['key']
    })
  };

  async run() {
    const { flags } = this.parse(Decrypt);
    const { serialized, key, privateKeyFile } = flags;
    if (key) {
      const decodedKey = decodeSafe64(key);
      const decrypted = await decryptWithKey({ serialized, key: decodedKey });
      this.log(decrypted);
    } else if (privateKeyFile) {
      const privateKeyPem = binaryBufferToString(await read(privateKeyFile));
      const decrypted = await decryptSerializedWithPrivateKey({
        serialized,
        privateKeyPem
      });
      this.log(decrypted);
    } else {
      this.error('Must specify either base-64 encoded encryption key or RSA private key file path');
    }
  }
}
