import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {

   const [photoUrl,setPhotoUrl] = useState();
    useEffect(()=>{
      place&&GetPlacePhoto();
    },[place])
  
    const GetPlacePhoto=async()=>{
      const data ={
        textQuery:place.placeName
      }
      const result = await GetPlaceDetails(data).then(resp=>{
        const photoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[4].name);
        setPhotoUrl(photoUrl);
        
      })
    }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+ place?.placeDetails} target="_blank">
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover: shadow-md cursor-pointer'>
      <img src={photoUrl?photoUrl:'/placeHolder.jpg'} 
      className='w-[130px] h-[130px] rounded-xl object-cover'/>

      <div className="p-4">
          <h5 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
            {place.placeName}
          </h5>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            <strong>Details:</strong> {place.placeDetails}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            <strong>Travel Time:</strong> 🕖 {place.timeToTravel}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            <strong>Ticket Pricing:</strong> 💵 {place.ticketPricing}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Rating:</strong> {place.rating}⭐
          </p>
        </div>
    </div>
    </Link>
    
  )
}

export default PlaceCardItem
