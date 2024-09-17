import { LabbledInput } from "./LabbledInput"
import { FaCircleUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { Authheader } from "./Authheader";
import { MdEmail } from "react-icons/md";
import { SubmitButton } from "./SubmitButton";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {BACKEND_URL} from "../config.ts"

export const SignupAuth = ()=>{
    const navigate = useNavigate();
    const [errMessage, setErrMessage] = useState("")
    const [signupData, setSignupData] = useState({
        username: "",
        email:"",
        password: ""
    })

    const hitbackend = async ()=>{
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                username: signupData.username,
                email: signupData.email,
                password: signupData.password
            });
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/");
        }catch (err) {
            if (axios.isAxiosError(err)) {
              if (err.response) {
                setErrMessage(err.response.data.msg);
              } else {
                alert("An error occurred but no specific message was provided.");
              }
            } else {
              alert("An unexpected error occurred.");
            }
          }
    }
    return <div className="h-screen flex flex-col justify-center items-center">
        <Authheader type="signup"/>
        <LabbledInput type="text" placeholder="Username" label={<FaCircleUser size={24}/>}onChange={(e)=>{
            setSignupData({
                ...signupData,
                username: e.target.value
            })
        }}/> 
        <LabbledInput type="email" placeholder="Email" label={<MdEmail size={24}/>}onChange={(e)=>{
            setSignupData({
                ...signupData,
                email: e.target.value
            })
        }}/>
        <LabbledInput type="password" placeholder="Password" label={<RiLockPasswordFill size={24}/>} onChange={(e)=>{
            setSignupData({
                ...signupData,
                password: e.target.value
            })
        }}/>
        <span className="mb-5 text-red-500">{errMessage}</span>
        <SubmitButton onClick={hitbackend} type="signup"/>
    </div>
}