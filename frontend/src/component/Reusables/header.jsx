import { useState } from 'react'
import { Link } from 'react-router-dom';

// import { Navigate } from 'react-router-dom';

export default function Header() {
 const [open, setOpen] = useState(true);

  const toggle = () =>{
    setOpen(!open)
  }
  return (
    
    <div>
      <header className={`bg-blue-900 text-white py-4 justify-between items-center flex px-2  w-full top-0`}>
        <p className='text-2xl '>cookBook</p>
        <ul className= {`${open ? 'flex' : 'hidden'} lg:flex lg:gap-20 lg:flex-row   flex-col gap-9   `} >

            <li><Link to="/">Home</Link></li>
            <li><Link to="/aboutUs">About</Link></li>
            <li><Link  to="/Contact">Contact</Link></li>
            <li><Link to="/Login">Login</Link></li>
            {/* <Link to="/Register">Register</Link> */}
{/* 
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Register</li>
            <li>Login</li> */}
        </ul>
        <p className='lg:hidden block' onClick={toggle}>🌗</p>
      </header>
    </div>
  )
}



{/* <header className={`bg-blue-900 text-white py-4 justify-between items-center flex px-2  w-full top-0`}>
        <p className='text-2xl '>cookBook</p>
        <ul className= {`${open ? 'flex' : 'hidden'} lg:flex lg:gap-20 lg:flex-row flex-col gap-9 fixed inset-0 z-40 bg-blue-900 justify-center items-center transition-transform duration-300 ease-in-out transform`}>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/aboutUs">About</Link></li>
    <li><Link to="/Contact">Contact</Link></li>
    <li><Link to="/Login">Login</Link></li>
</ul>
        <p className='lg:hidden block z-50 text-2xl cursor-pointer' onClick={toggle}>
    <span className={`${open ? 'hidden' : 'inline'}`}>☰</span>
    <span className={`${open ? 'inline' : 'hidden'}`}>✕</span>
</p>
      </header> */}

