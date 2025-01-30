'use client';

import { useState } from 'react';
import { formatCurrency, formatDate, formatStatus } from "@/lib/utils";

async function fetchDonations(page) {
  const response = await fetch(`/api/donations?page=${page}&limit=10`);
  if (!response.ok) {
    throw new Error('Failed to fetch donations');
  }
  return response.json();
}

export default function DonationsList({ initialDonations, totalPages }) {
  const [donations, setDonations] = useState(initialDonations);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePageChange = async (newPage) => {
    setLoading(true);
    try {
      const data = await fetchDonations(newPage);
      setDonations(data.donations);
      setCurrentPage(newPage);
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse text-center">Loading...</div>;
  }

  return (
    <div className="mt-8">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Name
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Phone
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Amount
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                M-Pesa Code
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {donations.map((donation) => {
              const status = formatStatus(donation.status);
              return (
                <tr key={donation._id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {donation.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {donation.phone}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {formatCurrency(donation.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${status.className}`}>
                      {status.text}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {donation.mpesaCode || '-'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {formatDate(donation.createdAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 text-sm font-medium ${
                  currentPage === page
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                } ${
                  page === 1 ? 'rounded-l-md' : ''
                } ${
                  page === totalPages ? 'rounded-r-md' : ''
                } border-t border-b border-r first:border-l`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
} 