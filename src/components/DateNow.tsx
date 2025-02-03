const DateNow = () => {
  const getCurrentTimestamp = (): number => {
    return Date.now();
  };

  return <div>Current Timestamp: {getCurrentTimestamp()}</div>;
};

export default DateNow;
