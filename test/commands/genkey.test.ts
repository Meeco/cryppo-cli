import { binaryStringToBytes, decodeSafe64 } from '@meeco/cryppo';
import { expect, test } from '@oclif/test';

describe('genkey', () => {
  test
    .stdout()
    .command(['genkey'])
    .it('Generates a random encryption 256-bit key', ctx => {
      expect(ctx.stdout).to.contain('256-bit URL-Safe Base64 encoded key:');

      const keyString = ctx.stdout.split('\n')[1].trim();
      const key = binaryStringToBytes(decodeSafe64(keyString));
      expect(key.length).to.equal(32);
    });

  test
    .stdout()
    .command(['genkey', '-l', '256'])
    .it('Generates a random encryption 256-bit key specifying the key length', ctx => {
      expect(ctx.stdout).to.contain('256-bit URL-Safe Base64 encoded key:');

      const keyString = ctx.stdout.split('\n')[1].trim();
      const key = binaryStringToBytes(decodeSafe64(keyString));
      expect(key.length).to.equal(32);
    });

  test
    .stdout()
    .command(['genkey', '-l', '128'])
    .it('Generates a random encryption 128-bit key specifying the key length', ctx => {
      expect(ctx.stdout).to.contain('128-bit URL-Safe Base64 encoded key:');

      const keyString = ctx.stdout.split('\n')[1].trim();
      const key = binaryStringToBytes(decodeSafe64(keyString));
      expect(key.length).to.equal(16);
    });

  test
    .stdout()
    .command(['genkey', '-l', '192'])
    .it('Generates a random encryption 192-bit key specifying the key length', ctx => {
      expect(ctx.stdout).to.contain('192-bit URL-Safe Base64 encoded key:');

      const keyString = ctx.stdout.split('\n')[1].trim();
      const key = binaryStringToBytes(decodeSafe64(keyString));
      expect(key.length).to.equal(24);
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
