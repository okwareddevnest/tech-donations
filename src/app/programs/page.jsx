'use client';

import Image from 'next/image';

const programs = [
  {
    title: 'Tech Education',
    description: 'Comprehensive technology education programs designed to build strong foundations in programming, web development, and digital skills.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    features: [
      'Hands-on coding workshops',
      'Web development bootcamps',
      'Digital literacy courses',
      'Project-based learning'
    ]
  },
  {
    title: 'Innovation Hub',
    description: 'A collaborative space where students can work on real-world projects, experiment with new technologies, and develop innovative solutions.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    features: [
      'Modern computer lab',
      'Mentorship programs',
      'Innovation workshops',
      'Tech competitions'
    ]
  },
  {
    title: 'Community Outreach',
    description: 'Programs designed to bring technology education directly to underserved communities and make digital skills accessible to everyone.',
    image: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?q=80&w=800&auto=format&fit=crop',
    features: [
      'Mobile tech labs',
      'Community workshops',
      'Parent education',
      'Digital inclusion initiatives'
    ]
  }
];

export default function ProgramsPage() {
  return (
    <div className="bg-white pt-16">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Our Programs
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Discover how we're making technology education accessible and empowering
            communities through our innovative programs.
          </p>
        </div>

        <div className="mt-16 space-y-20">
          {programs.map((program, index) => (
            <div
              key={program.title}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 items-center`}
            >
              <div className="lg:w-1/2">
                <div className="relative h-64 w-full sm:h-72 lg:h-96">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="rounded-2xl object-cover shadow-xl"
                  />
                </div>
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  {program.title}
                </h2>
                <p className="mt-4 text-lg text-gray-600">{program.description}</p>
                <ul className="mt-8 space-y-3">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-orange-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 