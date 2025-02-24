import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCardItem=({hotel , index})=>{

     const [photoUrl,setPhotoUrl] = useState();
      useEffect(()=>{
        hotel&&GetPlacePhoto();
      },[hotel])
    
      const GetPlacePhoto=async()=>{
        const data ={
          textQuery:hotel.hotelName
        }
        const result = await GetPlaceDetails(data).then(resp=>{
          const photoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[4].name);
          setPhotoUrl(photoUrl);
          
        })
      }

    const handleImageError = (e) => {
        e.target.src = '/placeHolder.jpg'; // Fallback image
      };
    

    return(
        <Link 
            
              to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName} ${hotel.hotelAddress}`} 
              target="_blank" 
              key={index}
            >
              <div className="p-4 border rounded-lg shadow-lg hover:scale-105 transition-all cursor-pointer">
                <img 
                  src={photoUrl?photoUrl:'/placeHolder.jpg'}
                  alt="Hotel" 
                  className='rounded-xl h-[180px] w-full object-cover' 
                  onError={handleImageError}
                />
                <h3 className='font-semibold mt-2 text-xl'>{hotel?.hotelName}</h3>
                <p className='text-lg text-blue-600 font-bold'>💰{hotel?.price}</p>
                <p className='text-xs'>📍{hotel?.hotelAddress}</p>
                <p className='text-x font-bold text-blue-800'>⭐{hotel?.rating}</p>
              </div>
            </Link>
          
  );
    
}

export default HotelCardItem