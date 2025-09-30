import forkknife from "../assets/icon/ForkKnife.png"
import timer from "../assets/icon/Timer.png"
import hero from "../assets/image/hero.svg"
import mask from "../assets/image/MaskGroup.png"
import profile from "../assets/image/Ellipse2.png"
import play from "../assets/icon/PlayCircle.png"
import Calories from "../component/calories.jsx"
import chief from "../assets/image/chief.png"
import Card from "../component/Reusables/card.jsx"
import Header from "../component/Reusables/header.jsx"

export default function Home() {
  return (
   <>
   <Header/>
    <div className='w-full'>
      <div className=' flex m-8  border rounded-3xl'>
     <div className='bg-blue-100 w-1/2 p-5 border-3 rounded-tl-3xl rounded-bl-3xl'>
      <div className='w-1/4 bg-white rounded-3xl flex gap-2 p-1 my-8'>
        <img src={hero} alt="" />
        <p>Hot Recipe</p>
      </div>
      <h1 className='text-5xl font-semibold my-7'>Spicy delicious <br /> chicken wings</h1>
      <p className='my-6'>Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod <br /> tempor incididunt ut labore et dolore magna aliqut enim ad minim </p>
      <div className='flex w-1/2 gap-3'>
        <div className='w-1/2 bg-slate-200 rounded-2xl p-1.5 flex items-center gap-3'>
          <img src={timer} alt="" />
          <p>30 minutes</p>
        </div>
        <div className='w-1/2 bg-slate-200 rounded-2xl p-1.5 flex gap-3 items-center'>
          <img src={forkknife} alt="fork" />
          <p>chicken</p>
        </div>
      </div>
      <div className='w-full justify-around flex mt-40'>
      <div className="flex gap-3">
        <img src={profile} alt="" />
        <p>jonh smith <br /><span>15 march 
          </span></p>
      </div>
      <div className="bg-black  text-white rounded-2xl flex justify-between items-center w-1/4 px-3">
        <p>view recipe</p>
        <img src={play} alt="" />
      </div>
     </div>
     </div>
     <div>
      <img src={mask} alt="mask" className='w-full h-full' />
     </div>
     
    </div>
    <Calories/>

    <div className="m-8 flex my-9 justify-between">
      <div className="w-1/2 flex  justify-center items-start flex-col relative">
        <h1 className="text-5xl font-semibold  mb-10">Everyone can be a <br /> chef in their own kitchen</h1>
        <p>Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do <br /> eiusmod tempor incididunt ut labore et dolore magna aliqut enim <br /> ad minim </p>
        <button className=" px-6 py-3 bg-black rounded-2xl text-white absolute bottom-0">learn more</button>
      </div>
      <div className="w-1/2">
        <img src={chief} alt="" />
      </div>
    </div>
    <Card/>
    </div>
   </>
  )
}
