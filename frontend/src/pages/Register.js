import React from 'react'
import git from "../assests/git.svg"
import linkdin from "../assests/linkdin.svg"
import discord from "../assests/discord.svg"
import twitter from "../assests/twitter.svg"
import google from "../assests/google.svg";
import apple from "../assests/apple.svg";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../features/userSlice";
import toast from "react-hot-toast";
function Register() {
    const navigate=useNavigate();
    const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch=useDispatch();
  function handleLogin() {
  
    
    signInWithPopup(auth, provider)
      .then(async(result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        
        const token = await auth.currentUser.getIdToken(true);
      
        // The signed-in user info.
        const user = result.user;
       
        const userInfo={
          displayName:user.displayName,
          email:user.email,
          photoURL:user.photoURL
        }
        localStorage.setItem("token",token);
dispatch(loginRedux(userInfo));
toast("Signed in Successfully")
navigate("/");
        const data=true;
        const headers = {
          withCredentials: true,
          headers: { 'Authorization': 'Bearer ' + token }
        };
       
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }
  return (
    <>
      <div className="flex flex-col lg:flex-row md:justify-between justify-start gap-2 lg:gap-0  items-center w-full h-screen">
        <div className="lg:bg-background bg-no-repeat bg-cover lg:w-1/2 lg:h-full h-1/8  w-full lg:bg-[#F8FAFF] bg-[#4285F4]  p-6 lg:p-12">
       <div className="w-full flex lg:flex-col flex-row justify-between items-center h-full ">
        <p className="text-white font-monst font-bold text-lg md:text-xl w-full">LOGO</p>
        <p className="text-white font-monst font-bold md:text-6xl text-3xl text-center">Board.</p>
        <p className="text-white hidden  font-monst font-bold text-2xl text-center lg:flex justify-center items-center gap-10"><img src={git} className="w-8 h-8"></img> <img src={twitter} className="w-8 h-8"></img> <img src={linkdin} className="w-8 h-8"></img> <img src={discord} className="w-8 h-8"></img></p>
       </div>
        </div>
        <div className="lg:w-1/2 w-full flex flex-col items-center justify-center p-6 lg:p-12 gap-6">
        <div className="flex flex-col md:w-2/3 w-full justify-between gap-2 items-start"><h1 className=" w-full text-3xl md:text-4xl text-black font-monst font-bold">Register Here</h1>
          <p className="text-black font-lato font-normal text-base  w-full ">Create a new account</p></div>
          
          <div className="md:w-2/3 w-full  flex justify-normal items-center gap-6">
            <button className="bg-white rounded-lg flex justify-normal gap-4 items-center py-2 px-6"><img src={google}></img><span className="text-[#858585] font-monst text-xs md:text-sm font-normal" onClick={handleLogin}>Sign in with Google</span></button>
            <button className="bg-white rounded-lg flex justify-normal gap-4 items-center py-2 px-6"><img src={apple}></img><span className="text-[#858585] font-monst text-xs md:text-sm font-normal">Sign in with Apple</span></button>
          </div>
          <div className="flex bg-[#FFFFFF] flex-col justify-between items-start rounded-xl md:w-2/3 w-full p-6 gap-6">
          <div className="flex flex-col justify-normal items-start gap-4 w-full">
              <label className="text-black font-lato font-normal text-base">Name</label>
              <input type="text" className="w-full bg-[#F5F5F5] rounded-md p-2"></input>
            </div>
            <div className="flex flex-col justify-normal items-start gap-4 w-full">
              <label className="text-black font-lato font-normal text-base">Email address</label>
              <input type="text" className="w-full bg-[#F5F5F5] rounded-md p-2"></input>
            </div>
            <div className="flex flex-col justify-normal items-start gap-4 w-full">
              <label className="text-black font-lato font-normal text-base">Password</label>
              <input type="password" className="w-full bg-[#F5F5F5] rounded-md p-2"></input>
            </div>
            
            <button className="bg-[#4285F4] text-white rounded-md w-full text-center font-monst font-bold text-base p-2" onClick={()=>{toast("Sign In using Google")}}>Sign In</button>
          </div>
          <p className="text-base font-normal font-lato text-[#858585] text-center w-full">Alredy Registered? <span className="text-base font-normal font-lato text-[#346BD4] cursor-pointer" onClick={()=>navigate("/signin")}>Login here</span></p>
          
        </div>
        <div className="w-full lg:hidden md:h-36 flex justify-center items-center gap-6 bg-[#4285F4] h-full"><img src={git} className="w-6 h-6"></img> <img src={twitter} className="w-6 h-6"></img> <img src={linkdin} className="w-8 h-8"></img> <img src={discord} className="w-8 h-8"></img></div>
      </div>
    </>
  )
}

export default Register