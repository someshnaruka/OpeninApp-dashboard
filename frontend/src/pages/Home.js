import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Dashboard from "../components/Dashboard";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Home() {
  const [section, setSection] = useState("Dashboard");

const data=useSelector((state)=>state.user);
const navigate=useNavigate();
useEffect(()=>{
  const token=localStorage.getItem("token");
  if(token==null)
  {
    toast("Sign In to continue");
    navigate("/signin")
  }

},[])



  console.log(section);
  function handlesection(value) {
    setSection(value);
  }
  return (
    <>
      <div className="bg-[#F8FAFF] flex justify-between items-start w-full h-full ">
        <div className="w-1/5  flex-1 p-6 lg:flex hidden    items-end justify-end h-full">
          <Menu section={handlesection}></Menu>
        </div>
        <div className="flex flex-col justify-start items-start lg:w-4/5 w-full">
          <div className="lg:py-8 lg:px-10 w-full">
            <Nav title={section}></Nav>
          </div>
          <div className="px-6 lg:px-10 w-full h-full">
            <Dashboard></Dashboard>
          </div>
        
        </div>
      </div>
    </>
  );
}

export default Home;
