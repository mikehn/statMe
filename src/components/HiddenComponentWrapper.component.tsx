// HiddenComponentWrapper.tsx

import React, { useState } from 'react'

interface HiddenComponentWrapperProps {
  children: React.ReactNode
}

const DemoComponent: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="space-y-8">
        <h1 className="text-center text-4xl font-bold text-white">
          Tailwind CSS Animations
        </h1>

        <div className="mx-auto flex max-w-sm items-center space-x-4 rounded-xl bg-white p-6 shadow-lg transition duration-500 hover:scale-105">
          <div>
            <div className="text-xl font-medium text-black">
              Hover Animation
            </div>
            <p className="text-gray-500">Scale on hover.</p>
          </div>
        </div>

        <div className="mx-auto flex max-w-sm items-center space-x-4 rounded-xl bg-white p-6 shadow-lg">
          <div className="animate-bounce">
            <div className="text-xl font-medium text-black">
              Bounce Animation
            </div>
            <p className="text-gray-500">Bounces every second.</p>
          </div>
        </div>

        <div className="mx-auto flex max-w-sm items-center space-x-4 rounded-xl bg-white p-6 shadow-lg">
          <div className="animate-spin">
            <div className="text-xl font-medium text-black">Spin Animation</div>
            <p className="text-gray-500">Spins continuously.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const HiddenComponentWrapper: React.FC<HiddenComponentWrapperProps> = ({
  children
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleDoubleClick = () => {
    setIsVisible(true)
  }

  return (
    <div className="h-screen bg-black">
      <div className={isVisible ? 'block' : 'hidden'}>{children}</div>
      <div className={isVisible ? 'hidden' : 'block'}>
        <DemoComponent />
      </div>
      <button
        onClick={handleDoubleClick}
        className={
          (isVisible ? 'hidden' : '') +
          ' absolute bottom-0 left-0 cursor-default rounded bg-black px-3 py-1 text-black focus:outline-none'
        }
      >
        Reveal
      </button>
    </div>
  )
}

export default HiddenComponentWrapper
