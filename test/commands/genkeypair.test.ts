import { expect, test } from '@oclif/test';

describe('genkeypair', () => {
  test
    .stdout()
    .command(['genkeypair', '-b', '2048', '-p', 'priv.pem', '-P', 'pub.pem'])
    .it('Generates an RSA key pair and write to output files', ctx => {
      expect(ctx.stdout).to.contain('Private key written to priv.pem');
      expect(ctx.stdout).to.contain('Public key written to pub.pem');
    });
});
