// TextTransformer.tsx
import React, { useState } from 'react'
import { copyToClipboard, saveTextAsFile } from 'utils'
import { Transform as TransformLib, UnTransform } from 'utils/transform.utils'

export interface Transform {
  transform: TransformFunction
  name: string
  bg: string
}

export type TransformFunction = (
  text: string,
  key: string,
  salt: string
) => string | Promise<string>

const TransformerMap: { [key: string]: Transform } = {
  swap: {
    bg: 'bg-blue-100',
    name: 'Letter Swap',
    transform: (text: string, key: string, salt: string) =>
      TransformLib.letterSwap(text, key, salt)
  },
  shift: {
    bg: 'bg-blue-100',
    name: 'Shift',
    transform: (text: string, key: string, salt: string) =>
      TransformLib.shift(text, key, salt)
  },
  xor: {
    bg: 'bg-blue-100',
    name: 'xor',
    transform: (text: string, key: string, salt: string) =>
      TransformLib.xorEncrypt(text, key, salt)
  },
  reverseSwap: {
    bg: 'bg-green-100',
    name: 'UnSwap',
    transform: (text: string, key: string, salt: string) =>
      UnTransform.reverseLetterSwap(text, key, salt)
  },
  unShift: {
    bg: 'bg-green-100',
    name: 'UnShift',
    transform: (text: string, key: string, salt: string) =>
      UnTransform.reverseShift(text, key, salt)
  },
  unXor: {
    bg: 'bg-green-100',
    name: 'unXor',
    transform: (text: string, key: string, salt: string) =>
      UnTransform.xorDecrypt(text, key, salt)
  }
}

const TextTransformer: React.FC = () => {
  const [inputText, setInputText] = useState<string>('')
  const [outputText, setOutputText] = useState<string>('')
  const [key, setKey] = useState<string>('')
  const [salt, setSalt] = useState<string>('')
  const [selectedTransforms, setSelectedTransforms] = useState<Transform[]>([])

  const addTransform = (transform: Transform) => {
    setSelectedTransforms([...selectedTransforms, transform])
  }

  const removeTransform = (index: number) => {
    setSelectedTransforms(selectedTransforms.filter((_, i) => i !== index))
  }

  const moveTransform = (index: number, direction: number) => {
    if (
      (direction === -1 && index > 0) ||
      (direction === 1 && index < selectedTransforms.length - 1)
    ) {
      const newTransforms = [...selectedTransforms]
      const temp = newTransforms[index]
      newTransforms[index] = newTransforms[index + direction]
      newTransforms[index + direction] = temp
      setSelectedTransforms(newTransforms)
    }
  }

  const applyTransformations = async () => {
    let result = inputText
    for (const transform of selectedTransforms) {
      const curRes = transform.transform(result, key, salt)
      if (typeof curRes === 'string') {
        result = curRes
      } else {
        result = await curRes
      }
    }
    setOutputText(result)
  }

  return (
    <div className="mx-auto mt-8 max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Text Transformer:
      </h2>
      <h3>use this for all your transformations same as long transform</h3>

      <div className="mb-4">
        <label
          htmlFor="input-text"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Input Text
        </label>
        <textarea
          id="input-text"
          rows={4}
          className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text here..."
        ></textarea>
      </div>

      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label
            htmlFor="key"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Key
          </label>
          <input
            type="text"
            id="key"
            className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter key (optional)"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="salt"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Salt
          </label>
          <input
            type="text"
            id="salt"
            className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
            value={salt}
            onChange={(e) => setSalt(e.target.value)}
            placeholder="Enter salt (optional)"
          />
        </div>
      </div>

      <div className="mb-4 flex flex-col md:flex-row">
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold">Available</h3>
          <ul className="rounded-lg bg-gray-100 p-2">
            {Object.entries(TransformerMap).map(([id, transformData]) => (
              <li key={id} className={'mb-2'}>
                <button
                  onClick={() => addTransform(transformData)}
                  className={
                    transformData.bg +
                    ' w-full rounded-md px-3 py-2 text-left text-sm hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  }
                >
                  {transformData.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex-1 md:ml-4 md:mt-0">
          <h3 className="mb-2 text-lg font-semibold">Selected</h3>
          <ul className="rounded-lg bg-gray-100 p-2">
            {selectedTransforms.map((transform, index) => (
              <li
                key={index}
                className={
                  'mb-2 flex items-center rounded-md pr-2 ' + transform.bg
                }
              >
                <span className="grow rounded-md  px-3 py-2">
                  {transform.name}
                </span>
                <button
                  onClick={() => moveTransform(index, -1)}
                  className="ml-2 rounded bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300 focus:outline-none"
                  disabled={index === 0}
                >
                  ↑
                </button>
                <button
                  onClick={() => moveTransform(index, 1)}
                  className="ml-1 rounded bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300 focus:outline-none"
                  disabled={index === selectedTransforms.length - 1}
                >
                  ↓
                </button>
                <button
                  onClick={() => removeTransform(index)}
                  className="ml-1 rounded bg-red-200 px-2 py-1 text-sm hover:bg-red-300 focus:outline-none"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={applyTransformations}
      >
        Apply Transformations
      </button>

      <div className="mt-4">
        <label
          htmlFor="output-text"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Output Text
        </label>
        <textarea
          id="output-text"
          rows={4}
          className="w-full rounded-lg border bg-gray-100 px-3 py-2 text-gray-700"
          value={outputText}
          readOnly
          placeholder="Transformed text will appear here..."
        ></textarea>
      </div>
      <button
        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => copyToClipboard(outputText)}
      >
        copy text
      </button>
      <button
        className="ml-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => saveTextAsFile(outputText, 'output.txt')}
      >
        download
      </button>
    </div>
  )
}

export default TextTransformer
