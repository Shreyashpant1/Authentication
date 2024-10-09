"use client";
import React,{useState} from "react";
import axios from "axios";
import Link from "next/link";
import {toast} from "react-hot-toast" ;
import { useRouter } from "next/navigation";

export default function UserProfile() {
    const router = useRouter()
    const[data,setData] = useState("nothing")
    const getuserdetials=async () => {
       const res = await axios.post("/api/users/me")
       console.log(res.data);
       setData(res.data.data._id)
    }

    const logout =async() => {
        try {
            await axios.get('/api/users/logout')
            toast.success("logout successfull")
            router.push("/login")
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
    
   
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p>Profile Page</p>
            <h2 className="p-1 rounded bg-orange-400">{data === "nothing" ? "Nothing" :<Link href={'/profile/${data}'}>Test{data}</Link>}</h2>
            <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={logout}
            >logout</button>
             <button className='bg-orange-500 mt-4 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'
            onClick={getuserdetials}
            >Get User Details</button>
        </div>
    )
}


