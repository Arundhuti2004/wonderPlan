import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';


function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
   const [openDailog, setOpenDailog] = useState(false);

  useEffect(()=>{
    console.log("user",user);
    
  },[])

  const login = useGoogleLogin({
    clientId:
      "649691225300-knn9fuq471n4vvqmsqhu8b3a36aschaq.apps.googleusercontent.com",
    onSuccess: (res) => {
      console.log(res);
      getUserProfile(res);
    },
    onError: (err) => console.log(err),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.acess_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDailog(false);
        window.location.reload();
      });
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
     <img src="logo.png"  className='h-12'/>
    <div>
      {user?
      <div className='flex items-center gap-3'>
        <a href="/createtrip">
        <Button variant="outline" className="rounded-full text-white bg-black">+ Create Trips</Button>
        </a>
        <a href="/my-trips">
        <Button variant="outline" className="rounded-full  text-white bg-black">My Trips</Button>
        </a>
        <Popover>
        <PopoverTrigger><img src={user?.picture} className='h-[35px] w-[35px] rounded-full' /></PopoverTrigger>
        <PopoverContent><h2 className='cursor-pointer'onClick={()=>{
          googleLogout();
          localStorage.clear();
          window.location.reload();
        }}>Logout</h2></PopoverContent>
        </Popover>
        
        


      </div>: <Button onClick={()=>setOpenDailog(true)}>Sign In</Button>
    }
    </div>
    <Dialog open={openDailog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>open</DialogTitle>
              <DialogDescription>
                <img src="/logo.svg" />
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <span>Sign in to the app with Google authentication </span>
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In With GOOGLE
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
   
    </div>
  )
}

export default Header
