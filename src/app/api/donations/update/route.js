import { NextResponse } from 'next/server';
import { updateDonationByCheckoutId } from '@/services/donationService';

export async function POST(request) {
  try {
    const { checkoutRequestId, mpesaCode } = await request.json();

    if (!checkoutRequestId || !mpesaCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updateResult = await updateDonationByCheckoutId(checkoutRequestId, {
      status: 'completed',
      mpesaCode,
      transactionDate: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, result: updateResult });
  } catch (error) {
    console.error('Error updating donation:', error);
    return NextResponse.json(
      { error: 'Failed to update donation' },
      { status: 500 }
    );
  }
} 