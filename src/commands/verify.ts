import cryppo from '../cryppo-wrapper';
import { bytesBufferToBinaryString } from '@meeco/cryppo';
import { Args, Command, Flags } from '@oclif/core';
import { handleException } from '../handle-exception';
import { readFileAsBuffer, writeFileContents } from '../util/file';

export default class Verify extends Command {
  static description = 'Verify an RSA signed file and write the contents to another file.';

  static examples = ['cryppo verify -P public.pem my_file.signed.txt my_file.txt'];

  static flags = {
    publicKeyFile: Flags.string({
      char: 'P',
      required: true,
      description: 'path to the public key file'
    })
  };

  static args = {
    file: Args.string({
      char: 'f',
      required: true,
      description: 'Signed file contents to verify'
    }),
    destination: Args.string({
      char: 'd',
      required: true,
      description: 'File to write the resulting verified content to'
    })
  };

  async run(): Promise<void> {
    try {
      const { flags, args } = await this.parse(Verify);
      const { publicKeyFile } = flags;
      const { file, destination } = args;
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
