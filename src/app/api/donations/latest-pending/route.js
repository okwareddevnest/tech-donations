import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Get the most recent pending donation
    const latestPending = await db.collection('donations')
      .find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .limit(1)
      .toArray();

    if (!latestPending || latestPending.length === 0) {
      return NextResponse.json(
        { error: 'No pending donations found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      donation: {
        checkoutRequestId: latestPending[0].checkoutRequestId,
        phone: latestPending[0].phone,
        amount: latestPending[0].amount,
        name: latestPending[0].name,
        createdAt: latestPending[0].createdAt
      }
    });
  } catch (error) {
    console.error('Error fetching latest pending donation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch latest pending donation' },
      { status: 500 }
    );
  }
} 