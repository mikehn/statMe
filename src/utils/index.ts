export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export async function copyToClipboard(text: string): Promise<void> {
  if (!navigator.clipboard) {
    throw new Error('Clipboard API not supported')
  }

  try {
    await navigator.clipboard.writeText(text)
    console.log('Text copied to clipboard')
  } catch (error) {
    console.error('Failed to copy text to clipboard', error)
    throw new Error('Failed to copy text to clipboard')
  }
}

export function saveTextAsFile(text: string, filename: string): void {
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.style.display = 'none'
  a.click()

  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
