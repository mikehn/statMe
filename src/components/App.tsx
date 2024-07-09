import React, { useState } from 'react'
import HideText from './HideText.component'
import ExtractText from './ExtractText.component'
import TextTransformer from './TextTransofrmer.component'
import HiddenComponentWrapper from './HiddenComponentWrapper.component'

const App: React.FC = () => {
  const [hiddenTextImage, setHiddenTextImage] = useState<string | null>(null)

  return (
    <HiddenComponentWrapper>
      <div className="bg-slate-950">
        <div className="container mx-auto bg-slate-950 p-4">
          <TextTransformer />
          <HideText setHiddenTextImage={setHiddenTextImage} />

          <ExtractText />

          {hiddenTextImage && (
            <div className="mx-auto mt-8 max-w-md rounded-lg border bg-white p-4 shadow-md">
              <button
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                onClick={() => downloadImage(hiddenTextImage)}
              >
                Download Image
              </button>
              <img
                className="mt-4 max-w-full rounded-lg"
                id="resultImage"
                src={hiddenTextImage}
                alt="Image with hidden text"
              />
            </div>
          )}
        </div>
      </div>
    </HiddenComponentWrapper>
  )
}

function downloadImage(imageSrc: string) {
  const link = document.createElement('a')
  link.href = imageSrc
  link.download = 'image-with-hidden-text.png'
  link.click()
}

export default App
