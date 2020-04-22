import { signWithPrivateKey } from '@meeco/cryppo';
import { binaryBufferToString } from '@meeco/cryppo/dist/src/util';
import { Command, flags } from '@oclif/command';
import { readFile, writeFile } from 'fs';
import { promisify } from 'util';

const read = promisify(readFile);
const write = promisify(writeFile);

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
    const { args, flags } = this.parse(Sign);
    const { privateKeyFile } = flags;
    const { file, destination } = args;
    const privateKey = await read(privateKeyFile);
    const fileContents = await read(file);
    const signed = await signWithPrivateKey(
      binaryBufferToString(privateKey),
      binaryBufferToString(fileContents)
    );
    await write(destination, signed.serialized);
    this.log('Signed contents written');
  }
}
