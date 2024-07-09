// utils.ts
export function stringToBinary(str: string): string {
  return str
    .split('')
    .map((char) => {
      return char.charCodeAt(0).toString(2).padStart(8, '0')
    })
    .join('')
}

export function binaryToString(binary: string): string {
  const chars = []
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.substr(i, 8)
    chars.push(String.fromCharCode(parseInt(byte, 2)))
  }
  return chars.join('')
}
