import { expect, test } from '@oclif/test';

describe('decrypt', () => {
  const encryptedValue =
    'Aes256Gcm.gSAByGMq4edzM0U=.LS0tCml2OiAhYmluYXJ5IHwtCiAgaW1QL09qMWZ6eWw0cmwwSgphdDogIWJpbmFyeSB8LQogIE5SbjZUQXJ2bitNS1Z5M0FpZEpmWlE9PQphZDogbm9uZQo=';
  const base64Key = 'vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk=';
  test
    .stdout()
    .command(['decrypt', '-k', base64Key, '-s', encryptedValue])
    .it('Decrypts a value with a key', ctx => {
      expect(ctx.stdout).to.contain('hello world');
    });
});
