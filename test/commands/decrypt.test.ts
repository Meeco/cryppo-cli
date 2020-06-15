import { stringAsBinaryBuffer } from '@meeco/cryppo/dist/src/util';
import { expect, test } from '@oclif/test';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as file from '../../src/util/file';

describe('decrypt', () => {
  const aesEncryptedValue =
    'Aes256Gcm.gSAByGMq4edzM0U=.LS0tCml2OiAhYmluYXJ5IHwtCiAgaW1QL09qMWZ6eWw0cmwwSgphdDogIWJpbmFyeSB8LQogIE5SbjZUQXJ2bitNS1Z5M0FpZEpmWlE9PQphZDogbm9uZQo=';
  const rsaEncryptedValue = readFileSync(join(__dirname, './rsa_encrypted'), 'utf-8');
  const privateKeyPem = readFileSync(join(__dirname, './test_private_key.pem'), 'utf-8');
  const fileStub: any = path =>
    path === 'id_rsa' ? Promise.resolve(stringAsBinaryBuffer(privateKeyPem)) : Promise.reject();
  const base64Key = 'vm8CjugMda2zdjsI9W25nH-CY-84DDYoBxTFLwfKLDk=';
  test
    .stdout()
    .command(['decrypt', '-k', base64Key, '-s', aesEncryptedValue])
    .it('Decrypts a value with an AES key', ctx => {
      expect(ctx.stdout).to.contain('hello world');
    });

  test
    .stdout()
    .stub(file, 'readFileAsBuffer', fileStub)
    .command(['decrypt', '-p', 'id_rsa', '-s', rsaEncryptedValue])
    .it('Decrypts a value with an RSA private key', ctx => {
      expect(ctx.stdout).to.contain('hello world');
    });
});
