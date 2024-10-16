"use client";
import CryptoJS from "crypto-js";

const secretKey = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_CLUB_CODE);

export function encryptClubId(clubId) {
  const encrypted = CryptoJS.AES.encrypt(clubId.toString(), secretKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
  return encrypted;
}

export function decryptClubId(encryptedClubId) {
  const decodedEncryptedClubId = decodeURIComponent(encryptedClubId);
  const bytes = CryptoJS.AES.decrypt(decodedEncryptedClubId, secretKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
}
