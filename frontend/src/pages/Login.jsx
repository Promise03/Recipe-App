// import React, { useEffect, useState } from "react";
// // import { loginUser } from "../redux/slices/authSlices";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast, ToastContainer } from "react-toastify";
// import Header from "../component/Reusables/header";
// import "react-toastify/dist/ReactToastify.css";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error, user, otpPending, otpVerified } = useSelector((state) => state.auth);

//   const resetForm = () => {
//     setForm({ email: "", password: "" });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(form));
//   };

// useEffect(() => {
//   if (otpPending) {
//     navigate("/verify-otp");
//     return;
//   }

//   if (otpVerified && user) {
//     toast.success("Login successful! Redirecting...");
//     const timer = setTimeout(() => {
//       if (user.role === "admin") {
//         navigate("/Dashboard");
//       } else {
//         navigate("/DashboardUser");
//       }
//     }, 2000);
//     return () => clearTimeout(timer);
//   }

//   if (error) {
//     toast.error(error);
//   }
// }, [otpPending, otpVerified, user, error, navigate]);


//   const toggle = () => {
//     navigate("/register");
//   };

//   return (
//     <div className="bg-blue-950 min-h-screen flex flex-col">
//       <Header />
//       <ToastContainer />
//       <div className="w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto shadow my-20 py-6 rounded-md backdrop-blur-3xl bg-white/10 flex-grow">
//         <center>
//           <h1 className="text-3xl font-serif text-white">FoodieLand</h1>
//         </center>
//         <form
//           className="flex flex-col w-full mx-auto px-6 my-5"
//           onSubmit={handleSubmit}
//         >
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="border my-4 py-2 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             value={form.email}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Enter your password"
//             className="border my-2 py-2 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             value={form.password}
//             required
//           />
//           <button
//             className="border bg-blue-300 my-4 py-3 rounded-full w-[80%] sm:w-[50%] md:w-[40%] lg:w-[30%] mx-auto transition-colors duration-300 hover:bg-blue-400 disabled:opacity-50"
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>
//         <center>
//           <p className="text-white">
//             Don't have an account yet?
//             <span
//               onClick={toggle}
//               className="text-blue-400 font-semibold cursor-pointer ml-1 hover:underline"
//             >
//               Sign Up
//             </span>
//           </p>
//         </center>
//       </div>
//     </div>
//   );
// }


import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "lucide-react";
import Header from "../component/Reusables/header";
import { loginUser } from "../redux/slices/loginSlices";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, tempToken } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setCredentials((prev) => ({ ...prev, [name]: value }));
  // };

  const resetForm = () => {
    setCredentials({
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  useEffect(() => {
    if (tempToken) {
      toast.success("Redirecting...");
      resetForm();
      const timer = setTimeout(() => {
        navigate("/verify-otp");
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (error) {
      toast.error(error);
    }
  }, [error, tempToken, navigate]);

    const toggle = () => {
    navigate("/register");
  };

return (
    <div className="bg-blue-950 min-h-screen flex flex-col">
      <Header />
      <ToastContainer />
      <div className="w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto shadow my-20 py-6 rounded-md backdrop-blur-3xl bg-white/10 flex-grow">
        <center>
          <h1 className="text-3xl font-serif text-white">FoodieLand</h1>
        </center>
        <form
          className="flex flex-col w-full mx-auto px-6 my-5"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="border my-4 py-2 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            value={credentials.email}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="border my-2 py-2 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            value={credentials.password}
            required
          />
          <button
            className="border bg-blue-300 my-4 py-3 rounded-full w-[80%] sm:w-[50%] md:w-[40%] lg:w-[30%] mx-auto transition-colors duration-300 hover:bg-blue-400 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <center>
          <p className="text-white">
            Don't have an account yet?
            <span
              onClick={toggle}
              className="text-blue-400 font-semibold cursor-pointer ml-1 hover:underline"
            >
              Sign Up
            </span>
          </p>
        </center>
      </div>
    </div>
  );
}

export default Login;


