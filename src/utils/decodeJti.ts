import CryptoJS from 'crypto-js';

export function decodeJti(jti: string, secureJti: string): string {
  return CryptoJS.AES.decrypt(jti, secureJti).toString(CryptoJS.enc.Utf8);
}
