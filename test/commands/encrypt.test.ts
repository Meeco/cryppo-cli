import {expect, test} from '@oclif/test'

describe('encrypt', () => {
  test
  .stdout()
  .command(['encrypt'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['encrypt', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
