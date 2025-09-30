// // VerifyOtp.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import Header from "../component/Reusables/header";

// export default function VerifyOtp() {
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const tempToken = localStorage.getItem("tempToken")

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!tempToken) {
//       toast.error("Session expired. Please login again.");
//       return navigate("/login");
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "/api//verify-otp",
//         { otp },
//         { headers: { Authorization: `Bearer ${tempToken}` } }
//       );

//       if (res.data.token) {
//         // store final token & user
//         localStorage.setItem("token", res.data.token);
//         // optional: set user in redux store
//         toast.success("OTP verified! Redirecting...");
//         // redirect based on role
//         const role = res.data.data.role;
//         setTimeout(() => {
//           if (role === "admin") navigate("/dashboard");
//           else navigate("/user-dashboard");
//         }, 1000);
//       } else {
//         toast.error("Unexpected response from server");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "OTP verify failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     setLoading(true);
//     try {
//       await axios.post("/api//resend-otp", {}, { headers: { Authorization: `Bearer ${tempToken}` }});
//       toast.success("OTP resent to your email");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Resend failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//   <>
//   <Header/>
//    <div className="flex items-center justify-center min-h-[89vh] bg-gradient-to-br from-indigo-300 via-white to-indigo-400">
//   <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
//     <ToastContainer />

//     <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
//       Enter OTP
//     </h2>

//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         maxLength={6}
//         placeholder="6-digit code"
//         required
//         className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//       />

//       <button
//         type="submit"
//         disabled={loading}
//         className={`w-full py-3 rounded-lg text-white font-semibold transition ${
//           loading
//             ? "bg-indigo-400 cursor-not-allowed"
//             : "bg-indigo-600 hover:bg-indigo-700"
//         }`}
//       >
//         {loading ? "Verifying..." : "Verify"}
//       </button>
//     </form>

//     <button
//       onClick={handleResend}
//       disabled={loading}
//       className={`w-full mt-4 py-3 rounded-lg font-semibold border transition ${
//         loading
//           ? "text-gray-400 border-gray-300 cursor-not-allowed"
//           : "text-indigo-600 border-indigo-600 hover:bg-indigo-50"
//       }`}
//     >
//       Resend OTP
//     </button>
//   </div>
// </div>

//   </>
//   );
// }

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { verifyOtp, clearAuthMessage } from "../redux/slices/loginSlices";
import Header from "../component/Reusables/header";

export default function VerifyOtp() {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, message, token, user, otpPending } = useSelector(
        (state) => state.auth
    );

    // ✅ Handle navigation once OTP is verified
    useEffect(() => {
        if (token && user) {
            toast.success("OTP verified! Redirecting...");
            setTimeout(() => {
                if (user.role === "admin") navigate("/Dashboard");
                else navigate("/Dashboarduser");
            }, 1000);
        }
    }, [token, user, navigate]);

    // ✅ Show toast for error/success messages
    useEffect(() => {
        if (error) toast.error(error);
        if (message && !otpPending) toast.success(message);
        return () => {
            dispatch(clearAuthMessage());
        };
    }, [error, message, otpPending, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!otp) return toast.error("Please enter OTP");
        dispatch(verifyOtp({ otp }));
    };

    const handleResend = async () => {
        // Optionally implement resendOtp thunk in slice
        toast.info("Resend OTP feature not yet connected to Redux");
    };

return (
  <>
  <Header/>
   <div className="flex items-center justify-center min-h-[89vh] bg-gradient-to-br from-indigo-300 via-white to-indigo-400">
  <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
    <ToastContainer />

    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
      Enter OTP
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        placeholder="6-digit code"
        required
        className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-semibold transition ${
          loading
            ? "bg-indigo-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
    </form>

    <button
      onClick={handleResend}
      disabled={loading}
      className={`w-full mt-4 py-3 rounded-lg font-semibold border transition ${
        loading
          ? "text-gray-400 border-gray-300 cursor-not-allowed"
          : "text-indigo-600 border-indigo-600 hover:bg-indigo-50"
      }`}
    >
      Resend OTP
    </button>
  </div>
</div>

  </>
  );
}
