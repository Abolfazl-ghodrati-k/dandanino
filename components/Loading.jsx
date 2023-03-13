import React from 'react'
import SyncLoader from 'react-spinners/SyncLoader'

function Loading() {
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 bg-[#6282ac] flex flex-col gap-[20px] justify-center items-center z-[1000]'>
      <SyncLoader
          color={"white"}
          loading={true}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p className='text-[white]'>لطفا صبر کنید ...</p>
    </div>
  )
}

export default Loading