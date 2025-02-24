import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  // Parse tripData if it's a JSON string
  let tripData = null;
  if (trip && trip.tripData) {
    try {
      tripData = JSON.parse(trip.tripData);
    } catch (error) {
      console.error("Failed to parse tripData:", error);
      return <p>Error parsing trip data. Please check the format.</p>;
    }
  }

  // Check if tripData is still null or undefined
  if (!tripData || !tripData.itinerary || typeof tripData.itinerary !== 'object') {
    return <p>No itinerary data available.</p>;
  }

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {tripData.itinerary
          ? Object.entries(tripData.itinerary).map(([day, itineraryDetails]) => (
              <div key={day} className="my-4">
                <h3 className="text-md font-semibold">{`Day: ${day} - ${itineraryDetails.theme}`}</h3>
                <p className="text-sm italic text-red-600">{`Best Time to Visit: ${itineraryDetails.bestTimeToVisit}`}</p>
                <div className=' grid grid-cols-2 gap-3'>
                {itineraryDetails.plan && itineraryDetails.plan.length > 0 ? (
                itineraryDetails.plan?.map((place , index)=>(
                    <div key={index}>
                         {/* <p className="text-sm italic text-red-600">{`Best Time to Visit: ${place.time}`}</p> */}
                         <PlaceCardItem place={place}/>
                    </div>
                ))  
              ): ( <p>No place available</p>)}
                </div>
              </div>
            ))
          : <p>No places to visit available</p>}
      </div>
    </div>
  );
}

export default PlacesToVisit;
