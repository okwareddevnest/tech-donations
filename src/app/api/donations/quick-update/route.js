import { NextResponse } from 'next/server';
import { updateDonationByCheckoutId } from '@/services/donationService';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const checkoutRequestId = searchParams.get('id');
    const mpesaCode = searchParams.get('code');

    if (!checkoutRequestId || !mpesaCode) {
      return NextResponse.json(
        { error: 'Missing id or code parameter' },
        { status: 400 }
      );
    }

    const updateResult = await updateDonationByCheckoutId(checkoutRequestId, {
      status: 'completed',
      mpesaCode,
      transactionDate: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, updated: updateResult.modifiedCount > 0 });
  } catch (error) {
    console.error('Quick update error:', error);
    return NextResponse.json(
      { error: 'Update failed' },
      { status: 500 }
    );
  }
} 