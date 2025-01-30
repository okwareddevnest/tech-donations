import { NextResponse } from 'next/server';
import { getDonationStats } from '@/services/donationService';

export async function GET() {
  try {
    const stats = await getDonationStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching donation stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donation stats' },
      { status: 500 }
    );
  }
} 