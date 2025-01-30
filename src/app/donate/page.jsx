'use client';

import PaymentForm from '@/components/PaymentForm';

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Make a Donation
          </h2>
          <p className="mt-4 text-gray-600">
            Your donation helps us continue our mission of empowering communities through technology.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <PaymentForm />
        </div>
      </div>
    </div>
  );
} 