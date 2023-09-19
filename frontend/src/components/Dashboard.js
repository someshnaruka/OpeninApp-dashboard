import React, { useEffect, useState } from "react";
import revenue from "../assests/revenue.svg";
import likes from "../assests/likes.svg";
import save from "../assests/total.svg";
import users from "../assests/users.svg";
import arrow from "../assests/arrow.svg";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart, { Legend, plugins } from "chart.js/auto";
import { data as dataValue } from "./data";
import { product } from "./product";
import { Doughnut } from "react-chartjs-2";
import add from "../assests/add.svg"
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { dataRedux } from "../features/dataSlice";
import what from "../assests/whatssapp.svg";
import insta from "../assests/insta.svg";
import mail from "../assests/mail.svg";
import yt from "../assests/yt.svg";
function Dashboard() {
  const [stats, setStats] = useState([]);
  const logindata=useSelector((state)=>state.user);
  const dispatch=useDispatch();
const Userdata=useSelector((state)=>state.data.dataValue)
console.log(Userdata,"login data");
console.log(Userdata,"userdata");
  useEffect(() => {
    (() => {
      // const config = {
      //   params:{
      //    email: logindata.email,
      //   }
      // };
      const data={
        email:logindata.email
      }
      axios
        .post(process.env.REACT_APP_SERVER_DOMAIN + "/getuser",data,{withCredentials:true})
        .then((response) => {
          if(response.data.alert)
          {
          
            dispatch(dataRedux(response.data.result));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, [logindata.email]);

  const total = stats.length;
  const transaction = [...new Set(stats.map((post) => post.userId))].length;
  console.log(transaction, "trans");
const [modal,setModal]=useState(false);
  console.log(stats, "user data");

  const data = {
    labels: dataValue.map((post) => post.Week),

    datasets: [
      {
        label: "Guest",
        data: dataValue.map((post) => post.guest),
        backgroundColor: "#98D89E",
        borderWidth: 1,
        barThickness: 50,
        borderRadius: 8,
      },
      {
        label: "User",
        data: dataValue.map((post) => post.user),
        backgroundColor: "#EE8484",
        borderWidth: 1,
        barThickness: 50,
        borderRadius: 8,
      },
    ],
  };
  const dataMobile = {
    labels: dataValue.map((post) => post.Week),

    datasets: [
      {
        label: "Guest",
        data: dataValue.map((post) => post.guest),
        backgroundColor: "#98D89E",
        borderWidth: 1,
        barThickness: 10,
        borderRadius: 8,
      },
      {
        label: "User",
        data: dataValue.map((post) => post.user),
        backgroundColor: "#EE8484",
        borderWidth: 1,
        barThickness: 10,
        borderRadius: 8,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
   
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",

        labels: {
          color: "black",
          padding: 50,
          pointStyle: "circle",
          usePointStyle: true,
        },
      },
    },
  };
  const optionsMobile = {
    maintainAspectRatio: false,
   
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",

        labels: {
          color: "black",
          padding: 50,
          pointStyle: "circle",
          usePointStyle: true,
        },
      },
    },
  };
  const dataPie = {
    labels: product.map((post)=>post.title),
    borderWidth:1,
    datasets: [{
      
      data: product.map((post)=>post.value),
      backgroundColor: [
        '#98D89E',
        '#F6DC7D',
        '#EE8484'
      ],
   verOffset: 4
    }]
  };
  const optionsPie = {
    maintainAspectRatio: false,
    borderJoinStyle:'round',
    borderWidth:0,
    borderAlign:'inner',
    cutout:70,
    direction:"column",
    
    plugins: {
      legend: {
        display: true,
        position: "right",
        align: "start",
       
        labels: {
          color: "black",
          padding: 38,
          fontWeight:700,
          pointStyle: "circle",
          usePointStyle: true,
        },
      },
    },
  };
  
 
  const optionsPieMobile = {
    maintainAspectRatio: false,
    borderJoinStyle:'round',
    borderWidth:0,
    borderAlign:'inner',
    cutout:50,
  
    
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",
        direction:"row",
       
        labels: {
          color: "black",
          padding: 10,
          fontWeight:700,
          pointStyle: "circle",
          usePointStyle: true,
        },
      },
    },
  };
  return (
    <>
      <div className="w-full flex my-8 flex-col justify-between items-start h-full gap-10">
        <div className="w-full  flex justify-between items-center lg:flex-row flex-col flex-wrap gap-4">
          <div className="lg:w-[23%] w-full rounded-2xl drop-shadow-lg border-[1px] border-[#E0E0E0] bg-white flex flex-col gap-1 justify-start items-start p-4">
            <div className="w-8 h-8 rounded-full bg-[#7FCD93] flex justify-center items-center ">
              <img src={revenue}></img>
            </div>
            <p className="font-lato text-sm font-normal text-black">
              Total Revenues
            </p>
            <div className="flex justify-between items-center w-full">
              <p className="font-open text-lg font-bold text-black">
                $ {total}
              </p>
              <p className="bg-[#E9F9EB] text-[#3CC952] p-1 rounded-3xl font-semibold font-open">
                + 2.5 %
              </p>
            </div>
            <div className="flex items-end justify-end w-2/3">
              <img src={arrow} className="w-3"></img>
            </div>
          </div>
          <div className="lg:w-[23%] w-full rounded-2xl drop-shadow-lg border-[1px] border-[#E0E0E0] bg-white flex flex-col gap-1 justify-start items-start p-4">
            <div className="w-8 h-8 rounded-full bg-[#DEBF85] flex justify-center items-center ">
              <img src={save}></img>
            </div>
            <p className="font-lato text-sm font-normal text-black">
              Total Transactions
            </p>
            <div className="flex justify-between items-center w-full">
              <p className="font-open text-lg font-bold text-black">
                {" "}
                {transaction}
              </p>
              <p className="bg-[#E9F9EB] text-[#3CC952] p-1 rounded-3xl font-semibold font-open">
                + 1.7 %
              </p>
            </div>
          </div>
          <div className="lg:w-[23%] w-full rounded-2xl drop-shadow-lg border-[1px] border-[#E0E0E0] bg-white flex flex-col gap-1 justify-start items-start p-4">
            <div className="w-8 h-8 rounded-full bg-[#ECA4A4] flex justify-center items-center ">
              <img src={likes}></img>
            </div>
            <p className="font-lato text-sm font-normal text-black">
              Total Likes
            </p>
            <div className="flex justify-between items-center w-full">
              <p className="font-open text-lg font-bold text-black"> {total}</p>
              <p className="bg-[#E9F9EB] text-[#3CC952] p-1 rounded-3xl font-semibold font-open">
                + 1.4 %
              </p>
            </div>
          </div>
          <div className="lg:w-[23%] w-full rounded-2xl drop-shadow-lg border-[1px] border-[#E0E0E0] bg-white flex flex-col gap-1 justify-start items-start p-4">
            <div className="w-8 h-8 rounded-full bg-[#A9B0E5] flex justify-center items-center ">
              <img src={users}></img>
            </div>
            <p className="font-lato text-sm font-normal text-black">
              Total Users
            </p>
            <div className="flex justify-between items-center w-full">
              <p className="font-open text-lg font-bold text-black"> {total}</p>
              <p className="bg-[#E9F9EB] text-[#3CC952] p-1 rounded-3xl font-semibold font-open">
                + 4.2 %
              </p>
            </div>
          </div>
        </div>
        <div className="w-full rounded-2xl drop-shadow-lg border-[1px] border-[#E0E0E0] bg-white flex flex-col gap-1 justify-start items-start p-8 h-1/2">
          <h1 className="font-monst text-xl font-bold text-black">
            Activities
          </h1>
          <p className="font-monst font-normal text-xm text-[#858585]">
            May - June 2021
          </p>
          <div className="w-full h-80 md:flex hidden">
            <Bar data={data} options={options} className="w-full h-3/4"></Bar>
          </div>
          <div className="w-full h-80 md:hidden flex">
            <Bar data={dataMobile} options={optionsMobile} className="w-full h-3/4"></Bar>
          </div>
          
        </div>
        <div className="w-full flex lg:flex-row flex-col gap-4  justify-between items-center">
        <div className="lg:w-[45%] w-full h-80 rounded-2xl drop-shadow-lg border-[1px] border-[#E0E0E0] bg-white flex flex-col gap-1 justify-start items-start p-8">
        <div className="flex w-full justify-between items-center"><h1 className="text-xl font-bold font-monst text-black">Top Products</h1>
        <p className="text-[#858585] font-monst font-normal text-sm ">May - June 2021</p></div>
          
          <div className="w-full md:flex hidden flex-col p-4 h-full font-bold"><Doughnut data={dataPie} options={optionsPie}></Doughnut></div>
          <div className="w-full flex md:hidden flex-col p-4 h-full font-bold"><Doughnut data={dataPie} options={optionsPieMobile}></Doughnut></div>
        </div>
        {
          Userdata[0]?.name ?  <div className="lg:w-[45%] h-80 w-full  cursor-pointer rounded-2xl drop-shadow-lg border-[1px] border-[#E0E0E0] bg-white flex flex-col justify-center gap-8 items-center p-8">
          <h1 className="w-full text-2xl font-semibold font-lato capitalize">{Userdata[0].name}</h1>
          <div className="flex flex-col w-full justify-center gap-6 items-center md:h-1/2">
          <div className="w-full flex md:flex-row flex-col justify-between gap-10 items-center">
            <p className="flex justify-start gap-5 underline items-start md:w-1/2 w-full"> <img src={what}></img> <span className="text-[#231F20] font-lato font-normal text-sm">{Userdata[0].phone}</span></p>
            <p className="flex justify-start gap-5 underline items-start md:w-1/2 w-full"> <img src={insta}></img> <span className="text-[#231F20] font-lato font-normal text-sm">{Userdata[0].insta}</span></p>
          </div>
          <div className="w-full md:flex-row flex-col flex justify-between gap-10 items-center">
            <p className="flex justify-start gap-5 underline items-start md:w-1/2 w-full"> <img src={mail}></img> <span className="text-[#231F20] font-lato font-normal text-sm">{Userdata[0].email}</span></p>
            <p className="flex justify-start gap-5 underline items-start md:w-1/2 w-full"> <img src={yt}></img> <span className="text-[#231F20] font-lato font-normal text-sm">{Userdata[0].youtube}</span></p>
          </div>
          </div>
        </div>: <div className="lg:w-[45%] h-80 w-full gap-4 cursor-pointer rounded-2xl drop-shadow-lg border-[1px] border-[#E0E0E0] bg-white flex flex-col justify-center items-center p-8">
          <div className="bg-[#F5F5F5] w-24 h-24 rounded-full flex justify-center items-center" onClick={()=>{setModal(true);document.body.style.overflowY="hidden"}}><img src={add} className="w-full p-4"></img></div>
          <p className="text-[#858585] font-lato font-semibold text-lg">Add Profile</p>
        </div>
        }
       
        </div>
        {
          modal && <Modal
          close={()=>{setModal(false);document.body.style.overflowY="auto"}}></Modal>
        }
      </div>
    </>
  );
}

export default Dashboard;
