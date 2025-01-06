import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  selectBudgetOption,
  selectTravelersList,
} from "../constants/option.jsx";
import { Button } from "../components/ui/button";
import { toast } from 'sonner';
import { chatSession } from "../service/AIModal.jsx";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
 
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";

const CreateTrip=()=> {
  const [place, setPlace] = useState();
  const [openDailog, setOpenDailog]=useState(false);
  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const login = useGoogleLogin({
    onSuccess: (res) => { 
      console.log(res);
      
      getUserProfile(res)},
    onError: (err) => console.log(err)
  })

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  

 
  

  const OnGenerateTrip = async () => {

    const user = localStorage.getItem('user');
  

    
    if (!user) {
      setOpenDailog(false);
      return;
    }
  
    try {
      if (
        (formData?.noOfDays > 5 && !formData?.location) ||
        !formData?.budget ||
        !formData?.traveler ||
        !formData?.noOfDays
      ) {
        toast("Please fill all details.");
        return;
      }

      const FINAL_PROMPT = AI_PROMPT
      .replace("{location}",formData?.location?.label )
        .replace("{totalDays}", formData?.noOfDays)
        .replace("{traveler}", formData?.traveler)
        .replace("{budget}", formData?.budget );

      console.log("FINAL_PROMPT:", FINAL_PROMPT);
      const result = await chatSession.sendMessage(FINAL_PROMPT);

      console.log(result?.response?.text());
    } catch (err) {
      console.error("An error occurred:", err);
      toast("An unexpected error occurred. Please try again.");
    }
  };
  
  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.acess_token}`,
        Accept: 'Application/json'
      }

    }).then((res) => {
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res.data))
      setOpenDailog(false);
      OnGenerateTrip();
    })
  }
   
  return (
    <>
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        <h1 className="font-bold text-3xl ">
          Tell us your travel preferences🌄🌴
        </h1>
        <p className="mt-3 text-gray-500">
          Just provide some basic information, and our trip planner will
          generate a coustomized itinerary based on your preferences{" "}
        </p>

        <div className="mt-10 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-3 font-medium">
              what is destination of chooice?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
              }}
            />
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium">
              How many days are you going?
            </h2>
            <Input
              placeholder={"Ex.3"}
              type="number"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">what is your budget ?</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {selectBudgetOption.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`p-4 border cursor-pointer rounded-lg hover: shadow-lg
                ${formData?.budget == item.title && "shadow-lg border-black"}
                `}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="fond-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">
              Who do you plan on traveling with on your next adventure?
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {selectTravelersList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("traveler", item.people)}
                  className={`p-4 border cursor-pointer rounded-lg hover: shadow-lg
                    ${
                      formData?.traveler == item.people &&
                      "shadow-lg border-black"
                    }
                `}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="fond-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-20 justify-end flex">
          <Button onClick={OnGenerateTrip}>Generate Trip</Button>
        </div>

        <Dialog open={openDailog} >
          <DialogContent >
            <DialogHeader>
                <DialogTitle>open</DialogTitle>   
              <DialogDescription>
                <img src="/logo.svg" />
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <span>Sign in to the app with Google authentication </span>
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center">
                  <FcGoogle className="h-7 w-7" />
                  Sign In With GOOGLE
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default CreateTrip;
