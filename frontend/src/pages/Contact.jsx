import React from 'react'
import contact from "../assets/image/contact.png"
import Card from '../component/Reusables/card'
import Header from '../component/Reusables/header'

export default function Contact() {
  return (
   <>
   <Header/>
    <div className='w-full  '>
      <h1 className='text-center text-5xl font-semibold mt-7'>Contact Us</h1>
      <div className='flex m-8  justify-between'> 
        <div className='w-1/3'>
          <img src={contact} alt="" />
        </div>
        <div className='w-[65%]'>
          <form action="">
            <div className='flex w-full gap-6 my-4'>
              <div className='w-1/2 flex flex-col gap-3'>
                <label htmlFor="name" className=''>NAME</label> 
              <input type="text" name="name" id="" placeholder='Enter ur name ' className='border p-4 w-full rounded-2xl' />
              </div>
              
              <div className='w-1/2 flex flex-col gap-3'>
                <label htmlFor="email">EMAIL ADDRESS</label>
              <input type="email" name="email" id="" placeholder='Enter ur email'className='border w-full p-4 rounded-2xl' />
              </div>
            </div>

            <div className='flex w-full gap-6 my-4'>
              <div className='w-1/2 flex flex-col gap-3'>
                <label htmlFor="name" className=''>SUBJECT</label> 
              <input type="text" name="name" id="" placeholder='Enter ur name ' className='border p-4 w-full rounded-2xl' />
              </div>
              
              <div className='w-1/2 flex flex-col gap-3'>
                <label htmlFor="email">ENQUIRY TYPE</label>
              <input type="email" name="email" id="" placeholder='Enter ur email'className='border w-full p-4 rounded-2xl' />
              </div>
            </div>  
           <div className='flex w-full flex-col gap-2 my-3'>
             <label htmlFor="message">MESSAGE</label>
            <textarea name="" id="" className='border w-full p-4 h-48' placeholder='Enter ur message'></textarea>
           </div>

          <button className='bg-blue-400 px-12 py-4 mt-8 rounded-2xl text-2xl'>submit</button>
          </form>
        </div>
      </div>
    </div>
    <Card/>
   </>
  )
}
