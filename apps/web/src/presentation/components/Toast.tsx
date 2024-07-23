interface ToastProps {
  text: string
  show: boolean
}

function Toast({ text, show }: ToastProps): JSX.Element {
  return (
    <div id="toast-danger"
      className={`${show ? 'opacity-100 z-50' : 'opacity-0 z-[-1]'}
        transition-opacity ease-in-out delay-150 duration-300 
        fixed top-3 right-3  items-center w-full max-w-xs p-4 mb-4
        rounded-lg shadow text-white bg-red-800`}
      role="alert">
      <div className='flex flex-row items-center'>
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-red-500 text-red-200">
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
          </svg>
        </div>
        <div className="ms-3 text-sm font-normal">{text}</div>
      </div>
    </div>
  )
}

export default Toast
