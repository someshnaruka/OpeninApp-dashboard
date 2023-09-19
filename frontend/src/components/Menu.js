import React, { useState } from 'react'
import dashboard from "../assests/dashboard.svg"
import transaction from "../assests/transaction.svg"
import schedule from "../assests/schedule.svg"
import setting from "../assests/setting.svg";
import user from "../assests/user.svg";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../features/userSlice';
import toast from 'react-hot-toast';
import { getAuth } from "firebase/auth";
import { app } from '../config/firebase';
function Menu(props) {
  const data=useSelector((state)=>state.user);

    const [section,setSection]=useState("Dashboard");
const dispatch=useDispatch();
const navigate=useNavigate();
    function handleSection(value){
        setSection(value);
        props.section(value);
    }
    function handlelogout(){
      const auth = getAuth(app);
      auth.signOut().then(()=>{
        localStorage.removeItem("token")
        toast("Logged Out Successfully");
        dispatch(logoutRedux());
        navigate("/signin")
      })
      
  };
  return (
    <>
    
        <div className="menu-gradient flex flex-col justify-between items-center flex-grow-1 h-screen rounded-2xl py-8 px-6  w-full">
            <div className="flex flex-col justify-between gap-5 items-center w-3/4">
              <h1 className="font-monst text-4xl font-bold  text-white w-full">
                Board.
              </h1>
              <p className="flex justify-start gap-4 items-center mt-10 w-full text-lg text-white caret-transparent  font-monst cursor-pointer" style={section==="Dashboard" ? {fontWeight:"700"}:{fontWeight:"400"}} onClick={()=>handleSection("Dashboard")}><img src={dashboard}></img> Dashboard</p>
              <p className="flex justify-start gap-4 items-center w-full text-lg text-white font-monst caret-transparent cursor-pointer" style={section==="Transactions" ? {fontWeight:"700"}:{fontWeight:"400"}} onClick={()=>handleSection("Transactions")}><img src={transaction}></img> Transactions</p>
              <p className="flex justify-start gap-4 items-center w-full text-lg text-white font-monst caret-transparent cursor-pointer" style={section==="Schedules" ? {fontWeight:"700"}:{fontWeight:"400"}} onClick={()=>handleSection("Schedules")}><img src={schedule}></img> Schedules</p>
              <p className="flex justify-start gap-4 items-center w-full text-lg text-white  font-monst caret-transparent cursor-pointer" style={section==="Users" ? {fontWeight:"700"}:{fontWeight:"400"}} onClick={()=>handleSection("Users")}><img src={user}></img> Users</p>
              <p className="flex justify-start gap-4 items-center w-full text-lg text-white  font-monst caret-transparent cursor-pointer" style={section==="Settings" ? {fontWeight:"700"}:{fontWeight:"400"}} onClick={()=>handleSection("Settings")}><img src={setting}></img> Settings</p>
            </div>
            <div className='flex flex-col justify-between gap-4 items-start w-3/4 mt-auto '>
            <p className='text-white font-normal text-sm font-monst cursor-pointer' onClick={handlelogout}>Log Out</p>
                <p className='text-white font-normal text-sm font-monst'>Help</p>
                <p className='text-white font-normal text-sm font-monst'>Contact Us</p>
            </div>
          </div>
    </>
  )
}

export default Menu