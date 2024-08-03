'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const searchParams = useSearchParams();
  const [gyroData, setGyroData] = useState([]);

  useEffect(() => {
    const data = searchParams.get('gyroData');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setGyroData(parsedData);
      } catch (error) {
        console.error('Error parsing gyroData:', error);
      }
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Profile Page</h1>
      <pre>{JSON.stringify(gyroData, null, 2)}</pre>
    </div>
  );
};

export default Page;
