import {expect, test} from '@oclif/test'

describe('decrypt', () => {
  test
  .stdout()
  .command(['decrypt'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['decrypt', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
