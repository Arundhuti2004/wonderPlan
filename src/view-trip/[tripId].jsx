import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InfoSection from '../../components/custom/infoSection'; // Adjust the path as per your structure

export default function TripDetails() {
  const router = useRouter();
  const { tripId } = router.query;

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripId) {
      fetchTripData();
    }
  }, [tripId]);

  const fetchTripData = async () => {
    try {
      // Replace with your actual data fetching logic
      const response = await fetch(`/api/trips/${tripId}`);
      const data = await response.json();
      setTrip(data);
    } catch (error) {
      console.error('Error fetching trip data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!trip) {
    return <div>No trip found!</div>;
  }

  return (
    <div className="p-10">
      <InfoSection trip={trip} />
      {/* Add other components like Recommended Hotels, Restaurants, etc. */}
    </div>
  );
}
