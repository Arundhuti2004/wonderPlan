import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { IoIosSend } from "react-icons/io";



function InfoSection({ trip }) {
  const [photoUrl,setPhotoUrl] = useState();
  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const data ={
      textQuery:trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      const photoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[4].name);
      setPhotoUrl(photoUrl);
      
    })
  }
  return (
    <div>
      <img
        src={photoUrl?photoUrl:'/placeHolder.jpg'}
        alt="Placeholder"
        className="h-[340px] w-full object-cover rounded-xl"
      />

      <div className="mt-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="font-bold text-3xl mb-4 text-gray-800 dark:text-white flex items-center justify-center ">Trip Details</h2>
        <div className="flex justify-center items-center gap-4">
          <div className="flex items-center  gap-5 flex-wrap">
          <span className="p-2 px-4 bg-orange-300 dark:bg-orange-300 text-black dark:text-black font-medium rounded-full">
          🌍{trip?.userSelection?.location?.label || '--'} Location
            </span>
            <span className="p-2 px-4 bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-300 font-medium rounded-full">
            📅{trip?.userSelection?.noOfDays || '--'} Days
            </span>
            <span className="p-2 px-4 bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-300 font-medium rounded-full">
            💸{trip?.userSelection?.budget || '--'} Budget
            </span>
            <span className="p-2 px-4 bg-purple-100 dark:bg-purple-700 text-purple-800 dark:text-purple-300 font-medium rounded-full">
            👪{trip?.userSelection?.traveler || '--'} People
            </span>
            
          </div>
          
        </div>
        <div className='flex justify-end mt-6'>
        <span className=' p-2 m-4 px-3  bg-blue-700 dark:bg-blue-700 text-white dark:text-white font-bold rounded-sm flex flex-col hover:bg-blue-800 hover:text-slate-100'>
            <button>🔗Share</button>
            </span>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
