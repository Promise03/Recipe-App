import React from 'react'
import salad from "../../assets/image/salad.png";
import salad2 from "../../assets/image/salad2.png"

export default function Card() {
  return (
   <>
    <div className='w-full'>
      <div className='m-8 bg-blue-100 relative rounded-2xl'>
        <div className='w-1/2 mx-auto text-center py-11'>
            <h1 className='text-5xl font-semibold my-8'>Deliciousness to your inbox</h1>
            <p className='mt-5 mb-20'>Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim </p>
           <div className='bg-white flex w-96 mx-auto p-2 justify-between rounded-2xl'>
            <input type="email" name="" id="" placeholder='Your email address' className='p-3 border-none ' />
            <button className='bg-black px-11 py-4 rounded-xl text-white'>Subscribe</button>
           </div>
        </div>
        <div className='absolute bottom-0'>
          <img src={salad} alt="" />
        </div>
        <div className='absolute bottom-0 right-0'>
          <img src={salad2} alt="" />
        </div>
      </div>
    </div>
   </>
  )
}
