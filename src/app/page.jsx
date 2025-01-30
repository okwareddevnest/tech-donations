'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  useEffect(() => {
    // Add animation classes on scroll
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-50" />
        <div className="relative pt-6 pb-16 sm:pb-24">
          <main className="mt-16 sm:mt-24">
            <div className="mx-auto max-w-7xl">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
                  <div>
                    <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                      <span className="block text-orange-600 xl:inline">Empowering</span>{' '}
                      <span className="block xl:inline">Communities Through Technology</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Join us in our mission to bridge the digital divide and create opportunities
                      for underserved communities through technology education and resources.
                    </p>
                    <div className="mt-8 sm:mt-12">
                      <Link
                        href="/donate"
                        className="inline-flex items-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        Donate Now
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
                  <div className="bg-white sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden sm:rounded-lg">
                    <div className="relative h-64 sm:h-72 md:h-96 lg:h-full">
                      <Image
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                        alt="Tech education"
                        fill
                        priority
                        className="object-cover rounded-lg shadow-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll opacity-0 transition-all duration-1000 ease-out">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Impact
              </h2>
              <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                Together, we're making a difference in communities across Kenya.
              </p>
            </div>
            <dl className="mt-10 text-center sm:mx-auto sm:grid sm:max-w-3xl sm:grid-cols-3 sm:gap-8">
              <div className="flex flex-col">
                <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">Students Reached</dt>
                <dd className="order-1 text-5xl font-bold tracking-tight text-orange-600">5,000+</dd>
              </div>
              <div className="mt-10 flex flex-col sm:mt-0">
                <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">Communities Served</dt>
                <dd className="order-1 text-5xl font-bold tracking-tight text-orange-600">20+</dd>
              </div>
              <div className="mt-10 flex flex-col sm:mt-0">
                <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">Success Rate</dt>
                <dd className="order-1 text-5xl font-bold tracking-tight text-orange-600">95%</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll opacity-0 transition-all duration-1000 ease-out">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Programs
              </h2>
              <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                Discover how we're making technology accessible to everyone.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Program Cards */}
              {[
                {
                  title: 'Tech Education',
                  description: 'Providing quality technology education to underserved communities.',
                  icon: '🎓'
                },
                {
                  title: 'Digital Literacy',
                  description: 'Teaching essential digital skills for the modern workforce.',
                  icon: '💻'
                },
                {
                  title: 'Innovation Hub',
                  description: 'Creating spaces for technological innovation and creativity.',
                  icon: '🚀'
                }
              ].map((program) => (
                <div
                  key={program.title}
                  className="rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="text-4xl">{program.icon}</div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{program.title}</h3>
                  <p className="mt-2 text-gray-500">{program.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-600">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-24 lg:px-8">
          <div className="animate-on-scroll opacity-0 transition-all duration-1000 ease-out">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to make a difference?</span>
              <span className="block text-orange-200">Join us in empowering communities.</span>
            </h2>
            <div className="mt-8 flex">
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-orange-600 hover:bg-orange-50"
                >
                  Donate Now
                </Link>
              </div>
              <div className="ml-3 inline-flex">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-orange-700 px-5 py-3 text-base font-medium text-white hover:bg-orange-800"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}