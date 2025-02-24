
import React from 'react';

import axios from 'axios';
import HotelCardItem from './hotelCardItem';
function Hotels({ trip }) {
  // Parse the tripData if it's a string
  const tripData = trip?.tripData ? JSON.parse(trip.tripData) : null;
  const hotels = tripData?.hotels || [];

  

  
  return (
    <div className='mt-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg'>
      <h2 className='font-bold text-3xl ml-5 flex flex-col justify-center items-center'>Hotel Recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 px-1'>
        {hotels.length === 0 ? (
          <p>No hotel data available.</p>
        ) : (
          hotels.map((hotel, index) => (
           <HotelCardItem hotel={hotel} index={index}/>
          ))
        )}
      </div>
    </div>
  );
}

export default Hotels;
