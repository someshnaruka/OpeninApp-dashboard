import React, { useState } from "react";
import search from "../assests/search.svg";
import bell from "../assests/bell.svg";
import demo from "../assests/demo.png";
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

import { useDispatch, useSelector } from "react-redux";
import transaction from "../assests/transaction.svg"
import schedule from "../assests/schedule.svg"
import setting from "../assests/setting.svg";
import user from "../assests/user.svg";
import toast from 'react-hot-toast';
import { getAuth } from "firebase/auth";
import { app } from '../config/firebase';
import { useNavigate } from "react-router-dom";
import { logoutRedux } from '../features/userSlice';
import dashboard from "../assests/dashboard.svg"
function Nav(props) {
  const data=useSelector((state)=>state.user);
  const [show,setShow]=useState(false);

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
  }
    
  return (
    <>
      <div className=" flex justify-between items-center w-full p-2">
      <div className="flex justify-start gap-4 items-center"><GiHamburgerMenu size={20} className="md:hidden flex" onClick={()=>setShow(true)}></GiHamburgerMenu>
        <h1 className="text-black lg:text-2xl text-lg font-monst font-bold">
          {props.title}
        </h1></div>
      
        <div className="flex justify-between items-center lg:gap-6 gap-3  ">
          <div className=" bg-white rounded-xl lg:py-2 lg:pr-8 lg:pl-3  md:flex hidden justify-around items-center">
            <input
              type="text"
              placeholder="Search..."
              className="text-[#B0B0B] rounded-xl font-lato font-normal text-sm p-2"
            ></input>
            <img src={search} className="w-4 h-4"></img>
          </div>
          <img src={bell} className="md:w-8 md:h-8 w-4 h-4"></img>
          <div className="rounded-full md:w-12 md:h-12 w-8 h-8 ">
            <img src={data.photoURL} className="w-full rounded-full overflow-clip"></img>
          </div>
        </div>
        {/* mobile nav */}
        {
          show && 
        <div className="menu-gradient flex absolute top-0 left-0 z-50 w-1/2 flex-col justify-between items-center flex-grow-1 h-screen  py-4 px-3 ">
        <div className="w-full flex justify-end items-center" onClick={()=>setShow(false)}> <AiOutlineClose size={30} color="white" className=""></AiOutlineClose></div>
       
            <div className="flex flex-col justify-between gap-5 items-center w-full">
              <h1 className="font-monst text-4xl font-bold  text-white w-full">
                Board.
              </h1>
              <p className="flex justify-start gap-4 items-center mt-10 w-full text-lg text-white caret-transparent  font-monst cursor-pointer" style={section==="Dashboard" ? {fontWeight:"700"}:{fontWeight:"400"}} onClick={()=>setShow(false)}><img src={dashboard}></img> Dashboard</p>
              <p className="flex justify-start gap-4 items-center w-full text-lg text-white font-monst caret-transparent cursor-pointer" style={section==="Transactions" ? {fontWeight:"700"}:{fontWeight:"400"}} onClick={()=>setShow(false)}><img src={transaction}></img> Transactions</p>
              <p className="flex justify-start gap-4 items-center w-full text-lg text-white font-monst caret-transparent cursor-pointer" style={section==="Schedules" ? {fontWeight:"700"}:{fontWeight:"400"}} onClick={()=>setShow(false)}><img src={schedule}></img> Schedules</p>
              <p className="flex justify-start gap-4 items-center w-full text-lg text-white  font-monst caret-transparent cursor-pointer" style={section==="Users" ? {fontWeight:"700"}:{fontWeight:"400"}} onClick={()=>setShow(false)}><img src={user}></img> Users</p>
              <p className="flex justify-start gap-4 items-center w-full text-lg text-white  font-monst caret-transparent cursor-pointer" style={section==="Settings" ? {fontWeight:"700"}:{fontWeight:"400"}} onClick={()=>setShow(false)}><img src={setting}></img> Settings</p>
            </div>
            <div className='flex flex-col justify-between gap-4 items-start w-3/4 mt-auto '>
            <p className='text-white font-normal text-sm font-monst cursor-pointer' onClick={handlelogout}>Log Out</p>
                <p className='text-white font-normal text-sm font-monst'>Help</p>
                <p className='text-white font-normal text-sm font-monst'>Contact Us</p>
            </div>
          </div>
        }

      </div>
    </>
  );
}

export default Nav;
