//React Imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
const Profile = () => {
  //Declarations
  const navigate = useNavigate();
  //Hooks
  useEffect(() => {
    if (!localStorage.getItem("profile")) {
      navigate("/auth");
    }
  }, [navigate]);
  return (
    <div>
      <Navbar />
      Profile
    </div>
  );
};

export default Profile;
