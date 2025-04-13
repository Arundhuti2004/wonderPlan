import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {

   const [photoUrl,setPhotoUrl] = useState();
    useEffect(()=>{
      place&&GetPlacePhoto();
    },[place])
  
    const GetPlacePhoto = async () => {
      const data = { textQuery: place.placeName };
      try {
        const resp = await GetPlaceDetails(data);
        if (resp.data && resp.data.places && resp.data.places[0] && resp.data.places[0].photos && resp.data.places[0].photos.length > 4) {
          const photoRef = resp.data.places[0].photos[4].name;
         
          const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
          setPhotoUrl(photoUrl);
        } else {
          console.warn("Could not find photo reference for place:", place.placeName);
         
          setPhotoUrl('/placeHolder.jpg'); 
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
      
        setPhotoUrl('/placeHolder.jpg');
      }
    };
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
