
function Header(): JSX.Element {
  return (
    <header className="flex flex-row w-full justify-center items-center h-24 gap-x-8
      sm:h-28 lg:h-32">
      <div>
        <h1 className="font-poller text-white text-lg
          sm:text-xl lg:text-2xl">HH</h1>
      </div>
      <div className="grow border h-0 border-b-0 max-h-0 max-w-5xl w-auto border-white"></div>
      <div>
        <ul className="font-monaco text-white text-sm text-right
          sm:text-lg lg:text-xl">
          <a href="https://github.com/hemilabs"
            target='_blank'
            className="hover:text-gray-400"><li>GITHUB</li></a>
          <a href="https://discord.gg/RyhaPp7NvQ"
            target='_blank'
            className="hover:text-gray-400">
            <li>COMMUNITY</li>
          </a>
          <a href="https://twitter.com/hemi_xyz/"
            target='_blank'
            className="hover:text-gray-400">
            <li>TWITTER</li>
          </a>
        </ul>
      </div>
    </header>
  )
}

export default Header
