import { expect, test } from '@oclif/test';

describe('sign', () => {
  test
    .stdout()
    .command(['sign'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world');
    });

  test
    .stdout()
    .command(['sign', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff');
    });
});
