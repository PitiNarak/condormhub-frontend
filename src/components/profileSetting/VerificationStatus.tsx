'use client';
import { Check, X } from 'lucide-react';
const VerificationStatus = () => {
  const verified = false;
  return (
    <div>
      {verified ? (
        <div className="flex text-green-500 gap-1">
          <Check />
          Verified
        </div>
      ) : (
        <div className="flex text-red-600 gap-1">
          <X />
          Not verified
        </div>
      )}
    </div>
  );
};

export default VerificationStatus;
