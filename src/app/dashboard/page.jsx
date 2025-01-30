import DonationStats from '@/components/DonationStats';
import DonationsList from '@/components/DonationsList';

async function getDashboardData() {
  try {
    const [donationsRes, statsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/donations?page=1&limit=10`),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/donations/stats`)
    ]);

    if (!donationsRes.ok || !statsRes.ok) {
      throw new Error('Failed to fetch dashboard data');
    }

    const [donationsData, statsData] = await Promise.all([
      donationsRes.json(),
      statsRes.json()
    ]);

    return { donationsData, statsData };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default async function DashboardPage() {
  try {
    const { donationsData, statsData } = await getDashboardData();

    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
              Donations Dashboard
            </h2>
          </div>

          <DonationStats stats={statsData} />

          <div className="mt-8">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Recent Donations
            </h3>
            <DonationsList
              initialDonations={donationsData.donations}
              totalPages={donationsData.pages}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            Error loading dashboard data. Please try again later.
          </div>
        </div>
      </div>
    );
  }
} 