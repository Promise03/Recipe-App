import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Notfound from "./pages/Notfound";
import About from "./pages/AboutUs";
import Dashboard from "./admin/pages/Dashboard";
import Users from "./admin/pages/Users";
import Recipes from "./admin/pages/Recipes";
import ContactMessages from "./admin/pages/contactMessage";
import DashboardUser from "./userDashboard/page/DashboardUser";
import Message from "./userDashboard/page/message";
import Recipe from "./userDashboard/page/Recipe";
import Profile from "./userDashboard/page/Profile";
// import Setting from "./userDashboard/page/setting";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./route/ProtectedRoute";
import UserDetails from "./admin/pages/UserDetails";
import RecipeDetail from "./admin/pages/RecipeDetails";
import EditUserModal from "./admin/component/EditUserModa";
import RecipeForm from "./admin/component/RecipeForm";
import VerifyOtp from "./pages/verifyOtp";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/AboutUs" element={<About />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Verify-otp" element={<VerifyOtp />} />
          <Route path="*" element={<Notfound />} />

          {/* <Route element={<ProtectedRoute allowedRoles={["admin"]} />}> */}
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/user-details/:id" element={<UserDetails />} />
            <Route path="/recipe-details/:id" element={<RecipeDetail />} />
            <Route path="/edit-recipe/:id" element={<RecipeForm/>} />
            <Route path="/edit-User/:id" element={<EditUserModal />} />
            <Route path="/ContactMessage" element={<ContactMessages />} />
          {/* </Route> */}
       {/* <Route element={<ProtectedRoute allowedRoles={["regular"]} />}> */}
          <Route path="/DashboardUser" element={<DashboardUser />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/Profile" element={<Profile />} />
          {/* <Route path="/setting" element={<Setting />} /> */}
          <Route path="/unauthorized" element={<Unauthorized />} />
           {/* </Route> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
