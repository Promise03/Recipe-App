// import React from "react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser, clearAuthState } from "../redux/slices/authSlices";
// import { Loader } from "lucide-react";
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import Header from "../component/Reusables/header";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function Register() {
//   const navigate = useNavigate();
//   const [data, setData] = useState({
//     name: "",
//     username: "",
//     email: "",
//     password: "",
//     role: "regular",
//   });

//   const dispatch = useDispatch();
//   const { loading, error, user } = useSelector((state) => state.auth);
//   const [confirmPassword, setConfirmpassword] = useState("");

//   const restForm = () => {
//     setData({
//       name: "",
//       username: "",
//       email: "",
//       password: "",
//       role: "regular",
//     });
//     setConfirmpassword("");
//   };

//   // Function to handle form data submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (data.password !== confirmPassword) {
//       toast.warning("Password do not match ");
//       return;
//     }

//     dispatch(clearAuthState());
//     dispatch(registerUser(data));
//   };

//   useEffect(() => {
//     let timer;
//     if (user) {
//       toast.success("Registration successful!");
//       restForm();
//       timer = setTimeout(() => {
//         dispatch(clearAuthState());
//         navigate("/login");
//       }, 5000);
//     }
//     if (error) {
//       toast.error(error);
//     }
//     return () => {
//       if (timer) {
//         clearTimeout(timer);
//       }
//     };
//   }, [user, error, navigate, dispatch]);

//   const image = [
//     '../assets/image/salad.png',
//     '../assets/image/salad2.png'
//   ];

//   var setting = {
//     dots: false,
//     autoplay: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplaySpeed: 2000,
//     fade: true
//   };

//   // New toggle function
//   const toggleToLogin = () => {
//     navigate("/login");
//   };

//   return (
//     <>
//       <Header />
//       <Slider {...setting}>
//         {image.map((imageUrl, index) => (
//           <div key={index} >
//             <div className="w-full h-screen" style={{ backgroundImage: `url('${imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//               <div className="mx-auto w-1/3 shadow " >
//                 <h1 className="text-3xl text-center my-7 font-serif">FoodieLand</h1>
//                 <ToastContainer />
//                 <form
//                   className="flex flex-col"
//                   onSubmit={handleSubmit}
//                 >
//                   <input
//                     type="text"
//                     placeholder="Enter Your name"
//                     className="border px-2 py-2 mx-4 my-3"
//                     onChange={(e) => setData({ ...data, name: e.target.value })}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Enter Your username"
//                     className="border px-2 py-2 mx-4 my-3"
//                     onChange={(e) => setData({ ...data, username: e.target.value })}
//                   />
//                   <input
//                     type="email"
//                     placeholder="Enter mail"
//                     className="border px-2 py-2 mx-4 my-3"
//                     onChange={(e) => setData({ ...data, email: e.target.value })}
//                   />
//                   <input
//                     type="password"
//                     placeholder="Create password"
//                     className="border px-2 py-2 mx-4 my-3"
//                     onChange={(e) => setData({ ...data, password: e.target.value })}
//                   />
//                   <input
//                     type="password"
//                     placeholder="Confirm password"
//                     className="border px-2 py-2 mx-4 my-3"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmpassword(e.target.value)}
//                   />
//                   <button
//                     type="submit"
//                     className="px-3 py-5 bg-blue-400 border rounded-3xl w-1/2 mx-auto my-4"
//                     disabled={loading}
//                   >
//                     {loading ? <Loader className="mx-auto animate-spin" /> : "Sign Up"}
//                   </button>
//                 </form>
//                 <center>
//                   <p>Already Have an account <span onClick={toggleToLogin}>Sign in</span></p>
//                 </center>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </>
//   );
// }


import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthState } from "../redux/slices/authSlices";
import { Loader } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../component/Reusables/header";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "regular",
  });

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const [confirmPassword, setConfirmpassword] = useState("");

  const restForm = () => {
    setData({
      name: "",
      username: "",
      email: "",
      password: "",
      role: "regular",
    });
    setConfirmpassword("");
  };

  // Function to handle form data submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.password !== confirmPassword) {
      toast.warning("Password do not match ");
      return;
    }

    dispatch(clearAuthState());
    dispatch(registerUser(data));
  };

  useEffect(() => {
    let timer;
    if (user) {
      toast.success("Registration successful!");
      restForm();
      timer = setTimeout(() => {
        dispatch(clearAuthState());
        navigate("/login");
      }, 5000);
    }
    if (error) {
      toast.error(error);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [user, error, navigate, dispatch]);

  // New toggle function
  const toggleToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <Header />
        <ToastContainer />
      <div className="bg-blue-950 min-h-screen flex items-center justify-center">
        <div className="mx-auto w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 shadow py-1 rounded-md backdrop-blur-3xl bg-white/10">
          <h1 className="text-3xl text-center my-5 font-serif text-white">FoodieLand</h1>
        
          <form
            className="flex flex-col"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Enter Your name"
              className="border px-2 py-2 mx-4 my-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Enter Your username"
              className="border px-2 py-2 mx-4 my-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
            <input
              type="email"
              placeholder="Enter mail"
              className="border px-2 py-2 mx-4 my-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Create password"
              className="border px-2 py-2 mx-4 my-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="border px-2 py-2 mx-4 my-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
            <button
              type="submit"
              className="px-3 py-3 bg-blue-400 border rounded-3xl w-1/2 mx-auto my-4 transition-colors duration-300 hover:bg-blue-500"
              disabled={loading}
            >
              {loading ? <Loader className="mx-auto animate-spin" /> : "Sign Up"}
            </button>
          </form>
          <center>
            <p className="text-white">Already Have an account <span className='text-blue-400 font-semibold cursor-pointer ml-1 hover:underline' onClick={toggleToLogin}>Sign in</span></p>
          </center>
        </div>
      </div>
    </>
  );
}
