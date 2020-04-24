import * as cryppo from '@meeco/cryppo';
import { stringAsBinaryBuffer } from '@meeco/cryppo/dist/src/util';
import { expect, test } from '@oclif/test';
import { stub } from 'sinon';
import * as file from '../../src/util/file';

describe('verify', () => {
  test
    // Mocked so we get a deterministic value for testing
    .stub(
      cryppo,
      'loadRsaSignature',
      stub().returns(
        Promise.resolve({
          data: 'signed_file_contents'
        })
      )
    )
    .stub(cryppo, 'verifyWithPublicKey', stub().returns(Promise.resolve(true)))
    .stub(file, 'writeFileContents', stub().returns(Promise.resolve()))
    .stub(
      file,
      'readFileAsBuffer',
      stub().callsFake(path => Promise.resolve(stringAsBinaryBuffer(`${path} contents`)))
    )
    .stdout()
    .command(['verify', '-P', 'id_rsa.pub', 'my_file_signed', 'my_file'])
    .it('verifies signed file contents and writes contents to destination', () => {
      const write: sinon.SinonStub = file.writeFileContents as any;
      const loadRsaSignature: sinon.SinonStub = cryppo.loadRsaSignature as any;
      const verifyWithPublicKey: sinon.SinonStub = cryppo.verifyWithPublicKey as any;

      expect(loadRsaSignature.getCall(0).args[0]).to.eql('my_file_signed contents');

      expect(verifyWithPublicKey.getCall(0).args[0]).to.eql('id_rsa.pub contents');
      expect(verifyWithPublicKey.getCall(0).args[1]).to.eql({ data: 'signed_file_contents' });

      expect(write.getCall(0).args[0]).to.eql('my_file');
      expect(write.getCall(0).args[1]).to.eql('signed_file_contents');
    });
});
