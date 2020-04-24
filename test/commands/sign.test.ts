import * as cryppo from '@meeco/cryppo';
import { binaryBufferToString, stringAsBinaryBuffer } from '@meeco/cryppo/dist/src/util';
import { expect, test } from '@oclif/test';
import { stub } from 'sinon';
import * as file from '../../src/util/file';

describe('sign', () => {
  test
    // Mocked so we get a deterministic value for testing
    .stub(
      cryppo,
      'signWithPrivateKey',
      stub().callsFake((pk, contents) =>
        Promise.resolve({
          serialized: `Sign.RSA.${binaryBufferToString(contents)}.${binaryBufferToString(pk)}`
        })
      )
    )
    .stub(file, 'writeFileContents', stub().returns(Promise.resolve()))
    .stub(
      file,
      'readFileAsBuffer',
      stub().callsFake(path => Promise.resolve(stringAsBinaryBuffer(`${path} contents`)))
    )
    .stdout()
    .command(['sign', '-p', 'id_rsa', 'my_file', 'my_file_signed'])
    .it('signs and writes signed file contents to a destination', ctx => {
      const write: sinon.SinonStub = file.writeFileContents as any;

      expect(ctx.stdout).to.contain('Signed contents written');

      expect(write.getCall(0).args[0]).to.eql('my_file_signed');
      expect(write.getCall(0).args[1]).to.eql('Sign.RSA.my_file contents.id_rsa contents');
    });
});
