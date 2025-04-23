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
  const displayDate =
    date === '0001-01-01T00:00:00Z'
      ? ''
      : new Date(date).toUTCString().slice(4, 16);

  return (
    <div className="flex gap-4 p-4 border rounded-lg shadow-md items-start bg-gray-50 w-full">
      <span>{displayDate}</span>
      <span>{reporter}</span>
      <span>{message}</span>
      <span>{status}</span>
    </div>
  );
}
