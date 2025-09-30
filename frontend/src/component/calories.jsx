import React from 'react'
import dessert from "../assets/image/dessert.png";
import late from "../assets/image/late.png";
import vegetable from "../assets/image/vegetable.png";
import meat from "../assets/image/meat.png";
import lunch from "../assets/image/lunch.png";
import rice from "../assets/image/rice.png";

export default function Calories() {
  return (
    <>
    <div className='w-full '>
  <div className='m-8'>   
     <div className='flex justify-between items-center my-12'>
        <h1 className='text-4xl font-semibold'>Calories</h1>
       <button className='p-2 bg-blue-100 rounded-2xl'>view all calories</button>
     </div>
      <div className='flex gap-4'>
        <div className='bg-slate-100 items-center flex flex-col gap-6 w-1/6 rounded-2xl'>
            <img src={rice} alt="" />
            <p>Breakfast</p>
        </div>
        <div className='bg-green-100 items-center flex flex-col gap-6 w-1/6 rounded-2xl'>
             <img src={vegetable} alt="" />
            <p>vegan</p>
        </div>
        <div className='bg-red-100 items-center flex flex-col gap-6 w-1/6 rounded-2xl'>
             <img src={meat} alt="" />
            <p>meat</p>
        </div>
        <div className='bg-yellow-100 items-center flex flex-col gap-6 w-1/6 rounded-2xl'>
             <img src={dessert} alt="" />
            <p>Dessert</p>
        </div>
        <div className='bg-slate-100 items-center flex flex-col gap-6 w-1/6 rounded-2xl'>
             <img src={lunch} alt="" />
            <p>Lunch</p>
        </div>
        <div className='bg-slate-100 items-center flex flex-col gap-6 w-1/6 rounded-2xl'>
             <img src={late} alt="" />
            <p>Chocolate</p>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}
