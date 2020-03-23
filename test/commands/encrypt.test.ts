import * as cryppo from '@meeco/cryppo';
import { CipherStrategy } from '@meeco/cryppo';
import { expect, test } from '@oclif/test';

const mockEncryptedValue = 'Aes256Gcm.gSAByGMq4edzM0U=.LS0tCml';

describe('encrypt', () => {
  const mockKey = cryppo.encodeSafe64('mockKey');
  test
    .stub(cryppo, 'encryptWithKey', mockEncrypt)
    .stdout()
    .command(['encrypt', '-k', mockKey, '-v', 'My Secret Data'])
    .it('Encrypts data with the key', ctx => {
      expect(ctx.stdout).to.contain(mockEncryptedValue);
    });
});

// Mocked because the actual encrypted value is not deterministic.
function mockEncrypt({ data, key, strategy }) {
  expect(data).to.equal('My Secret Data');
  expect(strategy).to.equal(CipherStrategy.AES_GCM);
  expect(key).to.equal('mockKey'); // decoded
  const serialized = mockEncryptedValue;
  return Promise.resolve({
    serialized
  });
}
