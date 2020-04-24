import * as cryppo from '@meeco/cryppo';
import { expect, test } from '@oclif/test';
import * as fs from 'fs';
import { stub } from 'sinon';
import * as util from 'util';

describe('genkeypair', () => {
  const mockKey = {
    privateKey: '--BEGIN RSA--*private*--END RSA--',
    publicKey: '--BEGIN RSA--*public*--END RSA--'
  };
  test
    // Mocked so we get a deterministic value for testing
    .stub(cryppo, 'generateRSAKeyPair', stub().returns(Promise.resolve(mockKey)))
    .stub(util, 'promisify', fn => fn)
    .stub(fs, 'writeFile', stub().returns(Promise.resolve()))
    .stdout()
    .command(['genkeypair', '-b', '2048', '-p', 'id_rsa', '-P', 'id_rsa.pub'])
    .it('Generates an RSA key pair and write to output files', ctx => {
      const write: sinon.SinonStub = fs.writeFile as any;
      const generate: sinon.SinonStub = cryppo.generateRSAKeyPair as any;

      expect(ctx.stdout).to.contain('Wrote new key pair');

      expect(generate.getCall(0).args[0]).to.eq(2048);

      expect(write.getCall(0).args[0]).to.eql('id_rsa');
      expect(write.getCall(0).args[1]).to.eql(mockKey.privateKey);

      expect(write.getCall(1).args[0]).to.eql('id_rsa.pub');
      expect(write.getCall(1).args[1]).to.eql(mockKey.publicKey);
    });
});
