import {
  verificationData,
  VerificationRecord,
} from '@/app/verification/mockingTable/fakeVerificationTable';

export async function uploadVerification(
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const file = formData.get('picture') as File | null;

  if (!file || file.size === 0) {
    return { error: 'No file uploaded. Please select an image.' };
  }

  const record: VerificationRecord = {
    id: crypto.randomUUID(), // Generates a unique and consistent ID
    file,
  };

  verificationData.push(record);
  console.log('New verification record:', record);

  return { success: true };
}
