// import { binaryStringToBytesBuffer } from '@meeco/cryppo';
import { expect, test } from '@oclif/test';
// Sinon uses CommonJS modules, so esModuleInterop": true is required in tsconfig.json
import * as fs from 'node:fs';
import sinon from 'sinon';

import * as file from '../../src/util/file';

// ./bin/run sign signature.out file_to_sign.txt -p priv.pem
describe('Sign data with a private key', () => {
  const pemPriv = `-----BEGIN RSA PRIVATE KEY-----
    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
    -----END RSA PRIVATE KEY-----`;

  const dataToSign = 'sign me';
  const fileWithSignature = 'signature.out';

  let stub;

  beforeEach(() => {
    if (fs.existsSync(fileWithSignature)) {
      fs.unlinkSync(fileWithSignature);
    }

    stub = sinon.stub(file, 'readFileAsBuffer');
    stub.callsFake(path => {
      let fileContents;
      if (path === 'priv.pem') {
        fileContents = pemPriv;
      } else if (path === 'file_to_sign.txt') {
        fileContents = dataToSign;
      }

      return Promise.resolve(fileContents) as any;
    });
  });

  afterEach(() => {
    stub.restore();
    if (fs.existsSync(fileWithSignature)) {
      fs.unlinkSync(fileWithSignature);
    }
  });

  test
    .stdout()
    .command(['sign', fileWithSignature, 'file_to_sign.txt', '-p', 'priv.pem'])
    .it('Sign data with an RSA private key', async ctx => {
      expect(ctx.stdout).to.contain('Signed contents written');

      expect(fs.existsSync(fileWithSignature)).to.equal(true);
    });
});
