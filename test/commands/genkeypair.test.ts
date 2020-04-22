import { expect, test } from '@oclif/test';

describe('genkeypair', () => {
  test
    .stdout()
    .command(['genkeypair'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world');
    });

  test
    .stdout()
    .command(['genkeypair', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff');
    });
});
