import React from 'react'
import plus from '../../assets/plus-icon.png'
import minus from '../../assets/minus-icon.png'

function Faq(): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col max-w-screen-xl items-center p-8 border border-white">
        <div className="flex flex-row justify-between w-full">
          <h2 className="font-space font-bold text-white text-5xl hover:text-gray-400">
            HOW IT WORKS
          </h2>
          <img src={minus} className="w-12" alt="Minus Icon" />
        </div>
        <div className="font-space font-light text-white text-3xl mt-8">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel fringilla est ullamcorper eget nulla facilisi.
          </p>
          <br/>
          <p>
            Ut aliquam purus sit amet luctus venenatis. Egestas sed sed risus pretium quam vulputate dignissim. Adipiscing at in tellus integer feugiat. Pulvinar proin gravida hendrerit lectus.
          </p>
          <br/>
          <p>
            Eleifend donec pretium vulputate sapien nec sagittis aliquam. Donec ac odio tempor.
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full max-w-screen-xl items-center p-8 border border-white">
        <h2 className="font-space font-normal text-white text-4xl">
          ADD A FEATURE
        </h2>
        <img src={plus} className="w-12" alt="Plus Icon" />
      </div>
      <div className="flex flex-row justify-between w-full max-w-screen-xl items-center p-8 border border-white">
        <h2 className="font-space font-normal text-white text-4xl">
          COMMUNITY
        </h2>
        <img src={plus} className="w-12" alt="Plus Icon" />
      </div>
    </div>
  )
}

export default Faq
