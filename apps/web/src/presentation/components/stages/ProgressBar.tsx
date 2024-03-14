interface ProgressBarProps {
  percent: number
}

function ProgressBar({ percent }:ProgressBarProps): JSX.Element {
  const totalBars = 18
  const activeBars = Math.round((totalBars * percent) / 100)
  const deactivateBars = totalBars - activeBars
  const bars = []
  let nextKey = 1

  for (let i = 0; i < activeBars; i++) {
    bars.push(<div key={nextKey} className='bg-water-blue w-7 h-14'></div>)
    nextKey++
  }

  for (let i = 0; i < deactivateBars; i++) {
    bars.push(<div key={nextKey} className='bg-water-blue/40 w-7 h-14'></div>)
    nextKey++
  }

  return (
    <div className="flex flex-row justify-center gap-3">
      {bars}
    </div>
  )
}

export default ProgressBar
