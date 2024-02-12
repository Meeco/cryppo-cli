import { expect, test } from '@oclif/test';
import * as fs from 'node:fs';
// Sinon uses CommonJS modules, so esModuleInterop": true is required in tsconfig.json
import sinon from 'sinon';

import * as file from '../../src/util/file';

// TODO: Stub writing to files and check the contents of the files

// ./bin/run verify out signature.out -P  pub.pem
describe('verify data with a public key', () => {
  const pemPub = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0rP2PrqjtbCDSTzDk3f0
  6htwWelc7v5AxybAc3fkRrHwdcuf/WlUVsyK+Qj/FOsPgh1HBKrGoHMtO6Gd4FQg
  VlrVm3UmmpRKlx0/Rr9JQrW3dKtp5NUYR0E6M7h1IDN6vJIjKKE4mZjqHl3EXcE6
  nfT4uoR7QZc8M1eGM3Tw4VtTNCkDhT/f0T0kK++vKMcRjAhGk5Fm1MZHzo6vWXKE
  UpsyZvGwjcjVDGZbLjAdir+xMuvhwPpO5DXV+TXtWxsH2zTJuY5POND0YUBPThZ4
  Ofq/uLVuy5ZU4Lk8r+FuVN1ydEANzmlj9B24RJrQh81ZEjQRMi++vgrN1lOW3//e
  /wIDAQAB
  -----END PUBLIC KEY-----`;

  const outFile = 'sign me';
  const fileWithSignature = 'signature.out';
  const signature =
    'Sign.Rsa2048.JV-5HbWVi7D1MS-8VBm6-gWrS3j5gqGq6wFRajEu_mRTFb32ekDkjnmCOI2fTEYAGzPEAAnM41rHvWc6Rsqh7pTT7iGCWfHuvJx56jQ-9BoVqiSHMukB6MzRm4FxAo-hWRv2fGR6lxKYM0bjVqF3J3oTF1ba59ps5ARefI34fdR3BZbLC0wb-Bw942hjqy0iaBfuOhhnLef4ZW097u4BKuKC11BIGDHI2azoh9QZnUCQAKiyjIBkJJCvpQ7T9kUr-aZv8jLTtINpmOicI-2iOyJuybTmefudbyNZN7GNqCKlYDH_BzbxLp-6RS-CbllHbxBMBlX5Wy6WNJyy3ikJZA==.c2lnbiBtZQ==';

  let stub;

  beforeEach(() => {
    if (fs.existsSync(outFile)) {
      fs.unlinkSync(outFile);
    }

    stub = sinon.stub(file, 'readFileAsBuffer');
    stub.callsFake(path => {
      let fileContents;
      if (path === 'pub.pem') {
        fileContents = pemPub;
      } else if (path === fileWithSignature) {
        fileContents = signature;
      }

      return Promise.resolve(fileContents) as any;
    });
  });

  afterEach(() => {
    stub.restore();
    if (fs.existsSync(outFile)) {
      fs.unlinkSync(outFile);
    }
  });

  test
    .stdout()
    .command(['verify', outFile, fileWithSignature, '-P', 'pub.pem'])
    .it('Sign data with an RSA private key', async ctx => {
      expect(ctx.stdout).to.contain('Signature verified - writing file...');
      expect(fs.existsSync(outFile)).to.equal(true);
    });
});
