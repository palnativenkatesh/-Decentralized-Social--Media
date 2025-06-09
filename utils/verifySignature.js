import { ethers } from 'ethers';

export async function verifySignature(address, signature, message) {
  const recoveredAddress = ethers.utils.verifyMessage(message, signature);
  return recoveredAddress.toLowerCase() === address.toLowerCase();
}

