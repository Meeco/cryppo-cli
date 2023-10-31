// import { bytesBufferToBinaryString, utf8ToBytes } from '@meeco/cryppo';
// import { expect, test } from '@oclif/test';
// import { stub } from 'sinon';
// import cryppo from '../../src/cryppo-wrapper';
// import * as file from '../../src/util/file';

// describe('sign', () => {
//   test
//     // Mocked so we get a deterministic value for testing
//     .stub(
//       cryppo,
//       'signWithPrivateKey',
//       stub().callsFake((pk, contents) => ({
//         serialized: `Sign.RSA.${bytesBufferToBinaryString(contents)}.${pk}`
//       }))
//     )
//     .stub(file, 'writeFileContents', stub().returns(Promise.resolve()))
//     .stub(
//       file,
//       'readFileAsBuffer',
//       stub().callsFake(path => Promise.resolve(utf8ToBytes(`${path} contents`)))
//     )
//     .stdout()
//     .command(['sign', '-p', 'id_rsa', 'my_file', 'my_file_signed'])
//     .it('signs and writes signed file contents to a destination', ctx => {
//       const write: sinon.SinonStub = file.writeFileContents as any;

//       expect(ctx.stdout).to.contain('Signed contents written');

//       expect(write.getCall(0).args[0]).to.eql('my_file_signed');
//       expect(write.getCall(0).args[1]).to.eql('Sign.RSA.my_file contents.id_rsa contents');
//     });
// });
