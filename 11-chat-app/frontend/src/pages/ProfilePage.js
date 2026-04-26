import { useState } from "react";
import axios from "../api/axios";

export default function ProfilePage(){
  const user = JSON.parse(localStorage.getItem("user"));
  const [name,setName]=useState(user.name);

  const update=async()=>{
    const {data}=await axios.put("/api/auth/profile",{name},{
      headers:{Authorization:`Bearer ${user.token}`}
    });

    localStorage.setItem("user",JSON.stringify(data));
  };

  return (
    <div className="p-5">
      <input value={name} onChange={e=>setName(e.target.value)} className="border p-2"/>
      <button onClick={update}>Save</button>
    </div>
  );
}