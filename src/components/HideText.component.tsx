import React, { useState } from 'react'
import { stringToBinary } from 'utils/enc.utils'

interface HideTextProps {
  setHiddenTextImage: (image: string) => void
}

const HideText: React.FC<HideTextProps> = ({ setHiddenTextImage }) => {
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const hideTextInImage = () => {
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

        const textBinary = stringToBinary(text + '\0')
        const textLength = textBinary.length

        if (textLength > data.length / 8) {
          alert('The image is too small to hide the text.')
          return
        }

        for (let i = 0; i < textBinary.length; i++) {
          data[i * 4] = (data[i * 4] & 0xfe) | parseInt(textBinary[i])
        }

        context.putImageData(imageData, 0, 0)
        const hiddenTextImage = canvas.toDataURL()
        setHiddenTextImage(hiddenTextImage)
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
        <h2 className="mb-4 text-center text-2xl font-semibold">StatMe</h2>
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
          <div>
            <label
              htmlFor="text-input"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Enter Text
            </label>
            <textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="anything"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <button
            onClick={hideTextInImage}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Stat it
          </button>
        </div>
      </div>
    </div>
  )
}

export default HideText
