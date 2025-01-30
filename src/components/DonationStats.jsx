import { formatCurrency } from "@/lib/utils";

export default function DonationStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">Total Donations</dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          {stats.totalDonations.toLocaleString()}
        </dd>
      </div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">Total Amount</dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          {formatCurrency(stats.totalAmount)}
        </dd>
      </div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">Average Donation</dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          {formatCurrency(stats.averageDonation)}
        </dd>
      </div>
    </div>
  );
} 