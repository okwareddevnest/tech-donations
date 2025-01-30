'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white pt-16">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              About Tech Charity
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Tech Charity was founded with a simple yet powerful mission: to bridge the digital
              divide and empower communities through technology education and resources.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              We believe that access to technology and digital skills is not just a privilege
              but a fundamental right in today's interconnected world.
            </p>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              <p className="mt-4 text-lg text-gray-600">
                A world where every individual has the opportunity to learn, grow, and succeed
                in the digital age, regardless of their background or circumstances.
              </p>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              <p className="mt-4 text-lg text-gray-600">
                To provide quality technology education, resources, and opportunities to
                underserved communities, empowering them to participate fully in the digital
                economy.
              </p>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
              alt="Our team at work"
              width={800}
              height={600}
              className="rounded-2xl shadow-xl"
            />
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900">Our Impact</h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-orange-50 p-6">
                  <p className="text-3xl font-bold text-orange-600">5,000+</p>
                  <p className="mt-2 text-sm text-gray-600">Students Trained</p>
                </div>
                <div className="rounded-lg bg-orange-50 p-6">
                  <p className="text-3xl font-bold text-orange-600">20+</p>
                  <p className="mt-2 text-sm text-gray-600">Communities Served</p>
                </div>
                <div className="rounded-lg bg-orange-50 p-6">
                  <p className="text-3xl font-bold text-orange-600">95%</p>
                  <p className="mt-2 text-sm text-gray-600">Success Rate</p>
                </div>
                <div className="rounded-lg bg-orange-50 p-6">
                  <p className="text-3xl font-bold text-orange-600">50+</p>
                  <p className="mt-2 text-sm text-gray-600">Partner Organizations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 