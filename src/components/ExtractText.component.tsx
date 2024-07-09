import React, { useState } from 'react'
import { copyToClipboard } from 'utils'
import { binaryToString } from 'utils/enc.utils'

const ExtractText: React.FC = () => {
  const [extractedText, setExtractedText] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const extractTextFromImage = () => {
    if (!file) {
      alert('Please select an image.')
      return
    }

    const reader = new FileReader()
    reader.onload = function (event) {
      const img = new Image()
      img.onload = function () {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        if (!context) return
        canvas.width = img.width
        canvas.height = img.height
        context.drawImage(img, 0, 0)

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        )
        const data = imageData.data

        let binaryText = ''
        for (let i = 0; i < data.length; i += 4) {
          binaryText += (data[i] & 1).toString()
        }

        const hiddenText = binaryToString(binaryText)
        setExtractedText(hiddenText.split('\0')[0])
      }
      if (event.target && event.target.result) {
        img.src = event.target.result as string
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="mx-auto mt-8 max-w-md">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-semibold">UnStat</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="file-upload"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Choose an image
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
            file:mr-4 file:rounded-full file:border-0
            file:bg-blue-50 file:px-4
            file:py-2 file:text-sm
            file:font-semibold file:text-blue-700
            hover:file:bg-blue-100"
            />
          </div>
          <button
            onClick={extractTextFromImage}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Extract Text
          </button>
          <div>
            <label
              htmlFor="extracted-text"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Extracted Text
            </label>
            <textarea
              disabled
              id="extracted-text"
              className="mt-1 min-h-[100px] w-full rounded-md border border-gray-300 bg-gray-50 p-3 text-gray-700"
              value={extractedText || ''}
            />
          </div>
          <button
            onClick={() => {
              copyToClipboard(extractedText)
            }}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            copy
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExtractText
