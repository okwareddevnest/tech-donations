import clientPromise from '@/lib/mongodb';

export async function createDonation(donationData) {
  const client = await clientPromise;
  const db = client.db();
  
  const donation = {
    ...donationData,
    createdAt: new Date(),
    status: 'pending'
  };

  const result = await db.collection('donations').insertOne(donation);
  console.log("Created donation:", result);
  return result;
}

export async function updateDonationByCheckoutId(checkoutRequestId, updateData) {
  console.log("Updating donation:", { checkoutRequestId, updateData });
  const client = await clientPromise;
  const db = client.db();

  try {
    const result = await db.collection('donations').updateOne(
      { checkoutRequestId },
      { $set: updateData }
    );
    console.log("Update result:", result);
    return result;
  } catch (error) {
    console.error("Error updating donation:", error);
    throw error;
  }
}

export async function getDonationByCheckoutId(checkoutRequestId) {
  console.log("Getting donation by checkoutRequestId:", checkoutRequestId);
  const client = await clientPromise;
  const db = client.db();

  try {
    const donation = await db.collection('donations').findOne({ checkoutRequestId });
    console.log("Found donation:", donation);
    return donation;
  } catch (error) {
    console.error("Error getting donation:", error);
    throw error;
  }
}

export async function getAllDonations(limit = 10, page = 1) {
  const client = await clientPromise;
  const db = client.db();

  const skip = (page - 1) * limit;
  
  const donations = await db.collection('donations')
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  const total = await db.collection('donations').countDocuments();
  
  return {
    donations,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page
  };
}

export async function getDonationStats() {
  const client = await clientPromise;
  const db = client.db();

  const stats = await db.collection('donations').aggregate([
    {
      $group: {
        _id: null,
        totalAmount: { $sum: '$amount' },
        totalDonations: { $sum: 1 },
        averageDonation: { $avg: '$amount' }
      }
    }
  ]).toArray();

  return stats[0] || {
    totalAmount: 0,
    totalDonations: 0,
    averageDonation: 0
  };
} 