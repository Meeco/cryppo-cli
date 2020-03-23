import * as cryppo from '@meeco/cryppo';
import { expect, test } from '@oclif/test';

describe('genkey', () => {
  const mockKey = 'vm8CjugMda2zdjsI9W25nH';
  const base64EncodedKey = 'dm04Q2p1Z01kYTJ6ZGpzSTlXMjVuSA=='; // from encodeSafe64
  test
    // Mocked so we get a deterministic value for testing
    .stub(cryppo, 'generateRandomKey', () => Promise.resolve(mockKey))
    .stdout()
    .command(['genkey'])
    .it('Generates a "random" encryption key', ctx => {
      expect(ctx.stdout).to.contain('URL-Safe Base64 encoded key:');
      expect(ctx.stdout).to.contain(base64EncodedKey);
    });
});
