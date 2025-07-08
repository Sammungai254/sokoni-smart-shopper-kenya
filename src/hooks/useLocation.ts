import { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { UserLocation } from '@/types/shopping';

export const useLocation = () => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentPosition = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if we're running in a Capacitor environment
      if (typeof window !== 'undefined' && (window as any).Capacitor) {
        const permissions = await Geolocation.checkPermissions();
        
        if (permissions.location !== 'granted') {
          const requestResult = await Geolocation.requestPermissions();
          if (requestResult.location !== 'granted') {
            throw new Error('Location permission denied');
          }
        }

        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000
        });

        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      } else {
        // Fallback to web geolocation
        if (!navigator.geolocation) {
          throw new Error('Geolocation not supported');
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: position.coords.accuracy
            });
          },
          (err) => {
            throw new Error(err.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
          }
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location');
    } finally {
      setLoading(false);
    }
  };

  // Get location on mount
  useEffect(() => {
    getCurrentPosition();
  }, []);

  return {
    location,
    loading,
    error,
    refetch: getCurrentPosition
  };
};