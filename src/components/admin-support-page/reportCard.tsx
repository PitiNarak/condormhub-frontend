'use client';
import { getProfileByID } from '@/actions/profile/getProfileByID';
import { updateReport } from '@/actions/support/updateReport';
import { useEffect, useState } from 'react';

interface ReportCardProp {
  id: string;
  reporter: string;
  date: string;
  message: string;
  status: string;
  handle: (id: string, status: string) => void;
}

export function ReportCard({
  id,
  reporter,
  date,
  message,
  status,
  handle,
}: ReportCardProp) {
  const [displayName, setDisplayName] = useState('');
  const [displayStatus, setdisplayStatus] = useState(status);
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

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      'IN-PROGRESS': {
        color: 'bg-yellow-100 text-yellow-800',
        text: 'In progress',
      },
      RESOLVED: { color: 'bg-green-100 text-green-800', text: 'Resolved' },
      OPEN: { color: 'bg-red-100 text-red-800', text: 'Open' },
    };

    const statusStyle = statusMap[status] || {
      color: 'bg-gray-100 text-gray-800',
      text: status || 'Unknown',
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle.color}`}
      >
        {statusStyle.text}
      </span>
    );
  };

  const renderStatusButtons = () => {
    if (displayStatus === 'OPEN') {
      return (
        <button
          className="w-40 bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          onClick={() => {
            updateReport(id, 'IN-PROGRESS');
            setdisplayStatus('IN-PROGRESS');
            // window.location.reload();
            handle(id, 'IN-PROGRESS');
          }}
        >
          Mark as In Progress
        </button>
      );
    } else if (displayStatus === 'IN-PROGRESS') {
      return (
        <button
          className="w-40 bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800  transition-colors"
          onClick={() => {
            updateReport(id, 'RESOLVED');
            setdisplayStatus('RESOLVED');
            // window.location.reload();
            handle(id, 'RESOLVED');
          }}
        >
          Mark as Resolved
        </button>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden w-full">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-black font-semibold mr-3">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{displayName}</h3>
            <p className="text-xs text-gray-500">{displayDate}</p>
          </div>
        </div>
        <div>{getStatusBadge(displayStatus)}</div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-700 whitespace-pre-wrap">{message}</p>
      </div>
      {(displayStatus === 'OPEN' || displayStatus === 'IN-PROGRESS') && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
          {renderStatusButtons()}
        </div>
      )}
    </div>
  );
}
