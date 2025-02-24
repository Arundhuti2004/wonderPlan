import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/service/firebase.config';
import { toast } from 'sonner';
import InfoSection from '../components/custom/infoSection.jsx';
import Hotels from '@/components/custom/Hotels.jsx';
import PlacesToVisit from '@/components/custom/PlacesToVisit.jsx';
import Footer from '@/components/custom/Footer.jsx';


function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const GetTripData = async () => {
      try {
        console.log('Fetching trip data for ID:', tripId); // Debugging log
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Document:', docSnap.data()); // Debugging log
          setTrip(docSnap.data());
        } else {
          console.log('No Such Document');
          toast('No Trip Found!');
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
        toast.error('An error occurred while fetching the trip data.');
      }
    };

    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  // Add your console.log here to print the state
  console.log('Trip data:', trip);
  
  
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection trip={trip} />
      <Hotels trip={trip} />
      <PlacesToVisit trip={trip}/>
      <Footer trip={trip}/>
      
    </div>
  );
}

export default ViewTrip;
