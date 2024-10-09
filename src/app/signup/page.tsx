"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";



export default function SignUpPage() {
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:"",
    })

    const[buttondisabled,setbuttondisabled] = React.useState(false);
    const[loading,setLoading] = React.useState(false);
    const onSignUp = async () =>{
        try {
            setLoading(true);
            const response = await axios.post("api/users/signup",user);
            console.log("signup success",response.data);
            router.push("/login");
        } catch (error:any) {
            toast.error(error.message);
            console.log("Signup Failed",error.message);
            
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if(user.email.length>0 && user.password.length>0 && user.username.length>0)
        {
            setbuttondisabled(false);
        } else {
            setbuttondisabled(true);
        }
    },[user]);

    return (
        <div className="flex flex-col tems-center justify-center min-h-screen py-2">
            <h1>{loading? "Processing": "Sign-Up"}</h1>
            <hr />
            <label htmlFor="UserName">username</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
               id="Username"
               type="text"
               value={user.username}
               onChange={(e) => setUser({...user,username: e.target.value})}
               placeholder="username"
               />
             <label htmlFor="email">email</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
               id="email"
               type="text"
               value={user.email}
               onChange={(e) => setUser({...user,email: e.target.value})}
               placeholder="email"
               />
             <label htmlFor="password">password</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
               id="password"
               type="password"
               value={user.password}
               onChange={(e) => setUser({...user,password: e.target.value})}
               placeholder="password"
               /> 
               <button 
                onClick={onSignUp}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttondisabled ? "NO signup" : "Signup"}</button>
                <Link href = "/login">Visit Login Page</Link>
            
        </div>
    )
}