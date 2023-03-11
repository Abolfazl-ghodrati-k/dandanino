import React from 'react'

function Customers() {
  return (
    <div className='flex flex-col items-center justify-between gap-[50px] mt-[2rem]'>
        <h1 className='font-black text-[2.25rem]'>مشتریانی که به ما اعتماد کردند</h1>
        <div className='grid grid-cols-4 [&>*]:col-span-2 [&>*]:mb-[3rem] md:[&>*]:col-span-1 min-w-[60%] max-w-[1400px] [&>*]:flex [&>*]:items-center [&>*]:justify-center'>
        <div className='filter contrast-0'>
            <img src="/Images/tamin.png" alt="" className='w-[100px]' />
        </div>
        <div className='filter grayscale brightness-100 opacity-60'>
            <img src="/Images/pertoshimi.png" alt="" className='w-[100px]' />
        </div>
        <div className='filter contrast-0'>
            <img src="/Images/rajaitehran.png" alt="" className='w-[100px]' />
        </div>
        <div className='filter contrast-0'>
            <img src="/Images/mahak.png" alt="" className='w-[100px]' />
        </div>
        </div>
    </div>
  )
}

export default Customers