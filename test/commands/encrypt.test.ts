import { bytesToUtf8 } from '@meeco/cryppo';
import { expect, test } from '@oclif/test';
import cryppo from '../../src/cryppo-wrapper';
import * as file from '../../src/util/file';

const mockEncryptedValue = 'Aes256Gcm.gSAByGMq4edzM0U=.LS0tCml';

describe('encrypt', () => {
  const mockKey = cryppo.encodeSafe64('mockKey');
  test
    .stub(cryppo, 'encryptWithKey', mockEncrypt as any)
    .stdout()
    .command(['encrypt', '-k', mockKey, '-v', 'My Secret Data'])
    .it('Encrypts data with an AES key', ctx => {
      expect(ctx.stdout).to.contain(mockEncryptedValue);
    });

  test
    .stub(cryppo, 'encryptWithPublicKey', (({ data, publicKeyPem }) =>
      Promise.resolve({
        serialized: `${bytesToUtf8(data)} encrypted w/ ${publicKeyPem}`
      })) as any)
    .stub(file, 'readFileAsBuffer', (path => Promise.resolve(`${path} contents`)) as any)
    .stdout()
    .command(['encrypt', '-P', 'id_rsa.pub', '-v', 'My Secret Data'])
    .it('Encrypts data with an RSA public key', ctx => {
      expect(ctx.stdout).to.contain('My Secret Data encrypted w/ id_rsa.pub contents');
    });
});

// Mocked because the actual encrypted value is not deterministic.
function mockEncrypt({ data, key, strategy }) {
  expect(bytesToUtf8(data)).to.equal('My Secret Data');
  expect(strategy).to.equal(cryppo.CipherStrategy.AES_GCM);
  expect(key.serialize).to.equal(cryppo.encodeSafe64('mockKey'));
  const serialized = mockEncryptedValue;
  return Promise.resolve({
    serialized
  });
}
