import { EncryptionKey, binaryStringToBytes } from '@meeco/cryppo';
import { expect, test } from '@oclif/test';
// Sinon uses CommonJS modules, so esModuleInterop": true is required in tsconfig.json
import sinon from 'sinon';

describe('genkey', () => {
  const mockKey: Uint8Array = binaryStringToBytes('vm8CjugMda2zdjsI9W25nHfugMdapYhb');
  const base64EncodedKey = 'dm04Q2p1Z01kYTJ6ZGpzSTlXMjVuSGZ1Z01kYXBZaGI='; // from encodeSafe64

  let stub;

  beforeEach(() => {
    stub = sinon.stub(EncryptionKey, 'generateRandom');
    stub.callsFake(() => EncryptionKey.fromBytes(mockKey));
  });

  afterEach(() => {
    stub.restore();
  });

  // test.it('foo', _ctx => {
  //   expect(true).to.equal(true);
  //   console.log(123);

  //   const d: Uint8Array = binaryStringToBytes('vm8CjugMda2zdjsI9W25nHfugMdapYhb');
  //   console.log(d);

  //   console.log(EncryptionKey.fromBytes(d).serialize);
  // });

  test
    .stdout()
    .command(['genkey'])
    .it('Generates a random encryption 256-bit key', ctx => {
      expect(ctx.stdout).to.contain('256-bit URL-Safe Base64 encoded key:');
      expect(ctx.stdout).to.contain(base64EncodedKey);
    });

  test
    .stdout()
    .command(['genkey', '-l', '256'])
    .it('Generates a random encryption 256-bit key specifying the key length', ctx => {
      expect(ctx.stdout).to.contain('256-bit URL-Safe Base64 encoded key:');
      expect(ctx.stdout).to.contain(base64EncodedKey);
    });

  test
    .stdout()
    .command(['genkey', '-l', '128'])
    .it('Generates a random encryption 128-bit key specifying the key length', ctx => {
      expect(ctx.stdout).to.contain('128-bit URL-Safe Base64 encoded key:');
    });

  test
    .stdout()
    .command(['genkey', '-l', '192'])
    .it('Generates a random encryption 192-bit key specifying the key length', ctx => {
      expect(ctx.stdout).to.contain('192-bit URL-Safe Base64 encoded key:');
    });

  test
    .stderr()
    .command(['genkey', '-l', '17'])
    .it('Provides a warning if an invalid AES key length is specified', ctx => {
      expect(ctx.stderr).to.contain('Warning: You have specified a key length of 17 bytes');
      expect(ctx.stderr).to.contain('AES only supports');
      expect(ctx.stderr).to.contain('128, 192 or 256 bit keys');
    });
});
