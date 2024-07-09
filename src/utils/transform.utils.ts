// utils/EncryptionUtils.ts

import { Buffer } from 'buffer'

class Transform {
  // Utility method to convert a string to base64
  private static toBase64(str: string): string {
    return Buffer.from(str, 'utf-8').toString('base64')
  }

  // Utility method to convert base64 to string
  private static fromBase64(base64: string): string {
    return Buffer.from(base64, 'base64').toString('utf-8')
  }

  // Letter swapping encryption
  static letterSwap(text: string, key: string, salt: string): string {
    const combinedKey = key + salt
    const swapped = text
      .split('')
      .map((char, index) => {
        const keyChar = combinedKey.charCodeAt(index % combinedKey.length)
        return String.fromCharCode(char.charCodeAt(0) ^ keyChar)
      })
      .join('')
    return this.toBase64(swapped)
  }

  // Shifting encryption
  static shift(text: string, key: string, salt: string): string {
    const combinedKey = key + salt
    const shifted = text
      .split('')
      .map((char, index) => {
        const shiftValue = combinedKey.charCodeAt(index % combinedKey.length)
        return String.fromCharCode(char.charCodeAt(0) + shiftValue)
      })
      .join('')
    return this.toBase64(shifted)
  }

  private static stringToArrayBuffer(str: string): ArrayBuffer {
    const encoder = new TextEncoder()
    return encoder.encode(str).buffer
  }

  // Utility method to convert an ArrayBuffer to a string
  private static arrayBufferToString(buffer: ArrayBuffer): string {
    const decoder = new TextDecoder()
    return decoder.decode(buffer)
  }

  static xorEncrypt(text: string, key: string, salt: string): string {
    const combinedKey = key + salt
    const xorEncrypted = text
      .split('')
      .map((char, index) => {
        const keyChar = combinedKey.charCodeAt(index % combinedKey.length)
        return String.fromCharCode(char.charCodeAt(0) ^ keyChar)
      })
      .join('')
    return this.toBase64(xorEncrypted)
  }
}

class UnTransform {
  // Utility method to convert a string to base64
  private static toBase64(str: string): string {
    return Buffer.from(str, 'utf-8').toString('base64')
  }

  // Utility method to convert base64 to string
  private static fromBase64(base64: string): string {
    return Buffer.from(base64, 'base64').toString('utf-8')
  }

  private static stringToArrayBuffer(str: string): ArrayBuffer {
    const encoder = new TextEncoder()
    return encoder.encode(str).buffer
  }

  // Utility method to convert an ArrayBuffer to a string
  private static arrayBufferToString(buffer: ArrayBuffer): string {
    const decoder = new TextDecoder()
    return decoder.decode(buffer)
  }

  static xorDecrypt(encryptedText: string, key: string, salt: string): string {
    const combinedKey = key + salt
    const xorDecrypted = this.fromBase64(encryptedText)
      .split('')
      .map((char, index) => {
        const keyChar = combinedKey.charCodeAt(index % combinedKey.length)
        return String.fromCharCode(char.charCodeAt(0) ^ keyChar)
      })
      .join('')
    return xorDecrypted
  }

  // Reverse letter swapping encryption
  static reverseLetterSwap(
    encryptedText: string,
    key: string,
    salt: string
  ): string {
    const combinedKey = key + salt
    const swapped = this.fromBase64(encryptedText)
      .split('')
      .map((char, index) => {
        const keyChar = combinedKey.charCodeAt(index % combinedKey.length)
        return String.fromCharCode(char.charCodeAt(0) ^ keyChar)
      })
      .join('')
    return swapped
  }

  // Reverse shifting encryption
  static reverseShift(
    encryptedText: string,
    key: string,
    salt: string
  ): string {
    const combinedKey = key + salt
    const shifted = this.fromBase64(encryptedText)
      .split('')
      .map((char, index) => {
        const shiftValue = combinedKey.charCodeAt(index % combinedKey.length)
        return String.fromCharCode(char.charCodeAt(0) - shiftValue)
      })
      .join('')
    return shifted
  }
}

export { UnTransform, Transform }
