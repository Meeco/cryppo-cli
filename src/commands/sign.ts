import { bytesBufferToBinaryString } from '@meeco/cryppo';
import { Args, Command, Flags } from '@oclif/core';

import cryppo from '../cryppo-wrapper';
import { handleException } from '../handle-exception';
import { readFileAsBuffer, writeFileContents } from '../util/file';

export default class Sign extends Command {
  static args = {
    destination: Args.string({
      char: 'd',
      description: 'File to write the resulting signed content to',
      required: true
    }),
    file: Args.string({
      char: 'f',
      description: 'File to sign',
      required: true
    })
  };

  static description =
    'Sign a file with an RSA private key and write the signed contents to a new file.';

  static examples = ['cryppo sign -p private.pem my_file.txt my_file.signed.txt'];

  static flags = {
    privateKeyFile: Flags.string({
      char: 'p',
      description: 'path to the private key file',
      required: true
    })
  };

  async run(): Promise<void> {
    try {
      const { args, flags } = await this.parse(Sign);
      const { privateKeyFile } = flags;
      const { destination, file } = args;
      const privateKey = await readFileAsBuffer(privateKeyFile);
      const fileContents = await readFileAsBuffer(file);
      const signed = cryppo.signWithPrivateKey(bytesBufferToBinaryString(privateKey), fileContents);
      await writeFileContents(destination, signed.serialized);
      this.log('Signed contents written');
    } catch (error) {
      await handleException(error, this);
    }
  }
}
