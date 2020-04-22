import { expect, test } from '@oclif/test';

describe('verify', () => {
  test
    .stdout()
    .command(['verify'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world');
    });

  test
    .stdout()
    .command(['verify', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff');
    });
});
