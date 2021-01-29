import * as cryppo from '@meeco/cryppo';

/**
 * Wrapper around the cryppo package so that we can mock
 * methods in testing (since jest can have trouble overwriting
 * import methods)
 */
const cryppoWrapper = {
  CipherStrategy: cryppo.CipherStrategy,
  decodeSafe64: cryppo.decodeSafe64,
  decryptWithKey: cryppo.decryptWithKey,
  encryptWithKey: cryppo.encryptWithKey,
  decryptSerializedWithPrivateKey: cryppo.decryptSerializedWithPrivateKey,
  encryptWithPublicKey: cryppo.encryptWithPublicKey,
  decryptWithPrivateKey: cryppo.decryptWithPrivateKey,
  signWithPrivateKey: cryppo.signWithPrivateKey,
  loadRsaSignature: cryppo.loadRsaSignature,
  generateRSAKeyPair: cryppo.generateRSAKeyPair,
  verifyWithPublicKey: cryppo.verifyWithPublicKey,

  encodeSafe64: cryppo.encodeSafe64
};

export default cryppoWrapper;
