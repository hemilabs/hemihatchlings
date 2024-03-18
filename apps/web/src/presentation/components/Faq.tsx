import plus from '../../assets/plus-icon.png'
import minus from '../../assets/minus-icon.png'

function Faq(): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col max-w-screen-xl items-center p-8 border border-white">
        <div className="flex flex-row justify-between w-full">
          <h2 className="font-space font-bold text-white text-lg hover:text-gray-400
            sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            HOW IT WORKS
          </h2>
          <img src={minus} className="w-4 md:w-6 lg:w-8" alt="Minus Icon" />
        </div>
        <div className="font-space font-light text-white text-sm mt-4
          sm:text-base md:text-lg lg:text-xl">
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
        <h2 className="font-space font-normal text-white text-lg
          sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          ADD A FEATURE
        </h2>
        <img src={plus} className="w-4 md:w-6 lg:w-8" alt="Plus Icon" />
      </div>
      <div className="flex flex-row justify-between w-full max-w-screen-xl items-center p-8 border border-white">
        <h2 className="font-space font-normal text-white text-lg
          sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          COMMUNITY
        </h2>
        <img src={plus} className="w-4 md:w-6 lg:w-8" alt="Plus Icon" />
      </div>
    </div>
  )
}

export default Faq
