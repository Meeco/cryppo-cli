import { bytesBufferToBinaryString } from '@meeco/cryppo';
import { Args, Command, Flags } from '@oclif/core';

import cryppo from '../../cryppo-wrapper';
import { handleException } from '../../handle-exception';
import { readFileAsBuffer, writeFileContents } from '../../util/file';

export default class Verify extends Command {
  static args = {
    destination: Args.string({
      char: 'd',
      description: 'File to write the resulting verified content to',
      required: true
    }),
    file: Args.string({
      char: 'f',
      description: 'Signed file contents to verify',
      required: true
    })
  };

  static description = 'Verify an RSA signed file and write the contents to another file.';

  static examples = ['cryppo verify -P public.pem my_file.signed.txt my_file.txt'];

  static flags = {
    publicKeyFile: Flags.string({
      char: 'P',
      description: 'path to the public key file',
      required: true
    })
  };

  async run(): Promise<void> {
    try {
      const { args, flags } = await this.parse(Verify);
      const { publicKeyFile } = flags;
      const { destination, file } = args;
      const publicKey = await readFileAsBuffer(publicKeyFile);
      const signed = await readFileAsBuffer(file);
      const rsaSignature = cryppo.loadRsaSignature(bytesBufferToBinaryString(signed));
      const verified = cryppo.verifyWithPublicKey(
        bytesBufferToBinaryString(publicKey),
        rsaSignature
      );
      if (verified) {
        this.log('Signature verified - writing file...');
      } else {
        this.error('Signature not verified - no files written.');
      }

      await writeFileContents(destination, rsaSignature.data);
    } catch (error) {
      await handleException(error, this);
    }
  }
}
