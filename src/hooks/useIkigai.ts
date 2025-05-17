import { useState, useEffect } from 'react';
import axios from 'axios';

interface IkigaiData {
  whatILove: string[];
  whatImGoodAt: string[];
  whatTheWorldNeeds: string[];
  whatICanBePaidFor: string[];
  summary?: string;
}

interface UseIkigaiProps {
  email: string;
}

export const useIkigai = ({ email }: UseIkigaiProps) => {
  const [ikigaiData, setIkigaiData] = useState<IkigaiData>({
    whatILove: [],
    whatImGoodAt: [],
    whatTheWorldNeeds: [],
    whatICanBePaidFor: [],
    summary: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/ikigai/${encodeURIComponent(email)}`);
        if (response.data) {
          setIkigaiData(response.data);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch Ikigai data');
        console.error('Error fetching Ikigai data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchData();
    }
  }, [email]);

  // Update Ikigai data
  const updateIkigai = async (section: keyof IkigaiData, items: string[]) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/ikigai', {
        email,
        section,
        items
      });

      if (response.data) {
        setIkigaiData(response.data);
        setError(null);
      }
    } catch (err) {
      setError('Failed to update Ikigai data');
      console.error('Error updating Ikigai data:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    ikigaiData,
    loading,
    error,
    updateIkigai
  };
}; 