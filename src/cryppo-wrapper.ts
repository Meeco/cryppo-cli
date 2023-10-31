import * as cryppo from '@meeco/cryppo';

/**
 * Wrapper around the cryppo package so that we can mock
 * methods in testing (since jest can have trouble overwriting
 * import methods)
 */
const cryppoWrapper = {
  CipherStrategy: cryppo.CipherStrategy,
  decodeSafe64: cryppo.decodeSafe64,
  decryptSerializedWithPrivateKey: cryppo.decryptSerializedWithPrivateKey,
  decryptWithKey: cryppo.decryptWithKey,
  decryptWithPrivateKey: cryppo.decryptWithPrivateKey,
  encodeSafe64: cryppo.encodeSafe64,
  encryptWithKey: cryppo.encryptWithKey,
  encryptWithPublicKey: cryppo.encryptWithPublicKey,
  generateRSAKeyPair: cryppo.generateRSAKeyPair,
  loadRsaSignature: cryppo.loadRsaSignature,
  signWithPrivateKey: cryppo.signWithPrivateKey,

  verifyWithPublicKey: cryppo.verifyWithPublicKey
};

export default cryppoWrapper;
