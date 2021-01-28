import cryppo from '../cryppo-wrapper';
import { bytesBufferToBinaryString } from '@meeco/cryppo';
import { Command, flags } from '@oclif/command';
import { handleException } from '../handle-exception';
import { readFileAsBuffer, writeFileContents } from '../util/file';

export default class Sign extends Command {
  static description =
    'Sign a file with an RSA private key and write the signed contents to a new file';

  static examples = ['cryppo sign -p private.pem my_file.txt my_file.signed.txt'];

  static flags = {
    privateKeyFile: flags.string({
      char: 'p',
      required: true,
      description: 'path to the private key file'
    })
  };

  static args = [
    {
      name: 'file',
      required: true,
      description: 'File to sign'
    },
    {
      name: 'destination',
      required: true,
      description: 'file to write the resulting signed content to'
    }
  ];

  async run() {
    try {
      const { args, flags } = this.parse(Sign);
      const { privateKeyFile } = flags;
      const { file, destination } = args;
      const privateKey = await readFileAsBuffer(privateKeyFile);
      const fileContents = await readFileAsBuffer(file);
      const signed = cryppo.signWithPrivateKey(
        bytesBufferToBinaryString(privateKey),
        fileContents
      );
      await writeFileContents(destination, signed.serialized);
      this.log('Signed contents written');
    } catch (error) {
      await handleException(error, this);
    }
  }
}
