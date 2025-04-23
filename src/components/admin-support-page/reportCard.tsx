import { getProfileByID } from '@/actions/profile/getProfileByID';
import { useEffect, useState } from 'react';

interface ReportCardProp {
  reporter: string;
  date: string;
  message: string;
  status: string;
}

export function ReportCard({
  reporter,
  date,
  message,
  status,
}: ReportCardProp) {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getProfileByID(reporter);
        if ('firstname' in result) {
          setDisplayName(result.firstname ?? '');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [reporter]);

  const displayDate =
    date === '0001-01-01T00:00:00Z'
      ? ''
      : new Date(date).toUTCString().slice(4, 16);
  return (
    <div className="flex gap-4 p-4 border rounded-lg shadow-md items-start bg-gray-50 w-full">
      <span>{displayDate}</span>
      <span>{displayName}</span>
      <span>{message}</span>
      <span>{status}</span>
    </div>
  );
}
