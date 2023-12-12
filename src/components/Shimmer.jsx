import React from 'react'

const Shimmer = () => {
  return (
    <div>
        {Array.from({length:10}).map((ele)=>(
            <div className='h-14 mb-2 w-full bg-gray-300 rounded-md shadow animate-pulse'></div>
        ))}
    </div>
  )
}

export default Shimmer