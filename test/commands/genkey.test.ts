import { EncryptionKey, binaryStringToBytes } from '@meeco/cryppo';
import { expect, test } from '@oclif/test';
// Sinon uses CommonJS modules, so esModuleInterop": true is required in tsconfig.json
import sinon from 'sinon';

describe('genkey', () => {
  const mockKey: Uint8Array = binaryStringToBytes('vm8CjugMda2zdjsI9W25nH');
  const base64EncodedKey = 'dm04Q2p1Z01kYTJ6ZGpzSTlXMjVuSA=='; // from encodeSafe64

  let stub;

  beforeEach(() => {
    stub = sinon.stub(EncryptionKey, 'generateRandom');
    stub.callsFake(() => EncryptionKey.fromBytes(mockKey));

  });

  afterEach(() => {
    stub.restore();
  });

  test
    .stdout()
    .command(['genkey'])
    .it('Generates a "random" encryption key', ctx => {
      expect(ctx.stdout).to.contain('URL-Safe Base64 encoded key:');
      expect(ctx.stdout).to.contain(base64EncodedKey);
    });

  test
    .stderr()
    .command(['genkey', '-l', '4'])
    .it('Provides a warning if an AES key length is specified', ctx => {
      expect(ctx.stderr).to.contain('Warning: You have specified a key length of 4 bytes');
      expect(ctx.stderr).to.contain('AES only supports');
      expect(ctx.stderr).to.contain('128, 192 or 256 bit keys');
    });
});
