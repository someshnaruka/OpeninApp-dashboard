import React, { useState } from "react";
import close from "../assests/close.svg"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { dataRedux } from "../features/dataSlice";
function Modal(props) {
  const data=useSelector((state)=>state.user)
    const [section,setSection]=useState("basic")
    const [details,setDetails]=useState({
      Useremail:data.email,
      name:"",
      email:"",
      phone:"",
      insta:"",
      youtube:""
    })
const dispatch=useDispatch();
    function handleChange(e){
    

      const {name,value}=e.target;
      setDetails((prev)=>{
        return{
          ...prev,
          [name]:value
        }
      });
      console.log(details);
    };

    function handleSubmit(e){
      e.preventDefault();
      if(details.name && details.email && details.phone)
      {
        axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/newUser",details).then((response)=>{
          if(response.data.alert)
          {
            dispatch(dataRedux(response.data.result));
            toast(response.data.message);
            props.close();
          }
        }).catch((err)=>{
          console.log(err);
        })
      }
      else
      {
        toast("Fill all mandatory fields")
      }
     
    }
  return (
    <>
      <div className="fixed inset-0 w-full p-4 h-screen bg-black/[.54] flex justify-center items-center">
        <div className="bg-white rounded-2xl md:w-1/2 w-full  flex flex-col justify-start items-start">
        <div className="flex w-full justify-between items-center"><h1 className="w-full font-lato text-xl p-6 font-semibold text-black">
            Add New Profile
          </h1>
          <img src={close} onClick={props.close} className="cursor-pointer px-8 w-24"></img></div>
          
          <div className="border-t-[1px] w-full border-t-[#F2F2F2] flex flex-col justify-between items-center">
            <div className="w-full flex justify-between items-center p-5 gap-10">
              <div className="flex-col flex justify-center items-center gap-4 w-1/2">
                <p className="font-lato font-semibold text-black text-lg">
                  Basic
                </p>
                <div className="w-full  rounded-3xl h-2" style={section==="basic" ? {backgroundColor:"#3F84F8"}:{backgroundColor:"#D9D9D9"}}></div>
              </div>
              <div className="flex-col flex justify-center items-center gap-4 w-1/2">
                <p className="font-lato font-semibold text-black text-lg">
                  Social
                </p>
                <div className="w-full rounded-3xl h-2"style={section==="social" ? {backgroundColor:"#3F84F8"}:{backgroundColor:"#D9D9D9"}}></div>
              </div>
            </div>
            {
                section ==="basic" ? <form className="w-full flex flex-col justify-between items-start gap-4 p-6">
              <label className="text-[#231F20] text-lg font-lato ">
                Enter Name*
              </label>
              <input
                type="text"
                placeholder="Eg. John Doe"
                required
                name="name"
                onChange={handleChange}
                value={details.name}
                className="text-[#999CA0] border-[1px] border-[#F2F2F2] w-full p-4 rounded-2xl"
              ></input>
              <label className="text-[#231F20] text-lg font-lato ">
                Enter Email*
              </label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={details.email}
                placeholder="Eg. John@xyz.com"
                required
                className="text-[#999CA0] border-[1px] border-[#F2F2F2] w-full p-4 rounded-2xl"
              ></input>
              <label className="text-[#231F20] text-lg font-lato ">
                Enter Phone*
              </label>
              <input
                type="text"
                name="phone"
                value={details.phone}
                onChange={handleChange}
                placeholder="Eg.  9123456789"
                required
                className="text-[#999CA0] border-[1px] border-[#F2F2F2] w-full p-4 rounded-2xl"
              ></input>
              <div className="w-full items-end flex justify-end">
                <button className="bg-[#3E84F8] text-white px-4 py-2 rounded-xl text-lg font-semibold font-lato" onClick={(e)=>{e.preventDefault();setSection("social");}}>Next</button>
              </div>
            </form> :<form className="w-full flex flex-col justify-between items-start gap-4 p-6">
              <label className="text-[#231F20] text-lg font-lato ">
              Instagram Link (Optional)  
              </label>
              <input
                type="text"
                name="insta"
                onChange={handleChange}
                value={details.insta}
                placeholder="Eg. ..instagram.com/username"
                className="text-[#999CA0] border-[1px] border-[#F2F2F2] w-full p-4 rounded-2xl"
              ></input>
              <label className="text-[#231F20] text-lg font-lato ">
              Youtube Link (Optional)
              </label>
              <input
                type="text"
                name="youtube"
                onChange={handleChange}
                value={details.youtube}
                placeholder="Eg. ..youtebe/username"
                className="text-[#999CA0] border-[1px] border-[#F2F2F2] w-full p-4 rounded-2xl"
              ></input>
               <div className="w-full items-end flex justify-end gap-4">
               <button className=" text-black border-[2px] border-[#999CA0]  px-4 py-2 rounded-xl text-lg font-semibold font-lato" onClick={(e)=>{e.preventDefault();setSection("basic")}}>Back</button>
                <button className="bg-[#3E84F8] border-[2px] border-transparent text-white px-4 py-2 rounded-xl text-lg font-semibold font-lato" onClick={handleSubmit}>Done</button>
                
              </div>
             
              
            </form>
            }
            
            
            

          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
