import { loadRsaSignature, verifyWithPublicKey } from '@meeco/cryppo';
import { binaryBufferToString } from '@meeco/cryppo/dist/src/util';
import { Command, flags } from '@oclif/command';
import { handleException } from '../handle-exception';
import { readFileAsBuffer, writeFileContents } from '../util/file';

export default class Verify extends Command {
  static description = 'Verify an RSA signed file and write the contents to another file.';

  static examples = ['cryppo verify -P public.pem my_file.signed.txt my_file.txt'];

  static flags = {
    publicKeyFile: flags.string({
      char: 'P',
      required: true,
      description: 'path to the public key file'
    })
  };

  static args = [
    {
      name: 'file',
      required: true,
      description: 'Signed file contents to verify'
    },
    {
      name: 'destination',
      required: true,
      description: 'File to write the resulting verified content to'
    }
  ];

  async run() {
    try {
      const { flags, args } = this.parse(Verify);
      const { publicKeyFile } = flags;
      const { file, destination } = args;
      const publicKey = await readFileAsBuffer(publicKeyFile);
      const signed = await readFileAsBuffer(file);
      const rsaSignature = await loadRsaSignature(binaryBufferToString(signed));
      const verified = await verifyWithPublicKey(binaryBufferToString(publicKey), rsaSignature);
      if (verified) {
        this.log('Signature verified - writing file...');
      } else {
        this.error('Signature not verified - no files written.');
      }
      await writeFileContents(destination, rsaSignature.data);
    } catch (error) {
      handleException(error, this);
    }
  }
}
