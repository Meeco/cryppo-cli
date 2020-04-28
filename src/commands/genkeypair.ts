import { generateRSAKeyPair } from '@meeco/cryppo';
import { Command, flags } from '@oclif/command';
import { writeFile } from 'fs';
import { promisify } from 'util';
import { handleException } from '../handle-exception';

export default class Genkeypair extends Command {
  static description = 'Generate a new RSA key pair, writing the private and public keys to files.';

  static examples = ['cryppo genkeypair -p private.pem -P public.pem'];

  static flags = {
    bits: flags.integer({ char: 'b', description: 'RSA key size', default: 4096 }),
    privateKeyOut: flags.string({
      required: true,
      char: 'p',
      description: 'Private key output path'
    }),
    publicKeyOut: flags.string({ required: true, char: 'P', description: 'Public key output path' })
  };

  async run() {
    try {
      const write = promisify(writeFile);

      const { flags } = this.parse(Genkeypair);
      const { bits, privateKeyOut, publicKeyOut } = flags;

      const pair = await generateRSAKeyPair(bits);
      await write(privateKeyOut, pair.privateKey);
      await write(publicKeyOut, pair.publicKey);

      this.log('Wrote new key pair');
    } catch (error) {
      handleException(error, this);
    }
  }
}
