import React, { Suspense, memo, lazy, useCallback } from 'react';
import { aboutPageData } from '../data/aboutPageData';

// Lazy loaded components
const StatItem = lazy(() => import('./components/StatItem'));
const TeamMember = lazy(() => import('./components/TeamMember'));
const CompanyLogo = lazy(() => import('./components/CompanyLogo'));

// Loading component
const LoadingFallback = memo(() => (
  <div className="animate-pulse">
    <div className="h-48 bg-gray-200 rounded-lg"></div>
  </div>
));

// Memoized section component
const Section = memo(({ children, className }) => (
  <div className={className}>
    {children}
  </div>
));

const AboutPage = () => {
  const { header, stats, companies, growth, teamMembers } = aboutPageData;

  // Memoize event handlers
  const handleExploreClick = useCallback(() => {
    // Handle explore click
    console.log('Explore clicked');
  }, []);

  const handleLearnMoreClick = useCallback(() => {
    // Handle learn more click
    console.log('Learn more clicked');
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Section className="max-w-7xl mx-auto px-4 pt-10 pb-8 lg:py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#252B42] mb-4 lg:mb-6">{header.title}</h1>
            <p className="text-base lg:text-xl text-gray-600 mb-8">{header.subtitle}</p>
            <button 
              className="bg-[#23A6F0] text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors mb-8 lg:mb-0"
              onClick={handleExploreClick}
            >
              Explore More
            </button>
          </div>
          <div className="relative">
            <img
              loading="lazy"
              src="https://picsum.photos/800/600?random=1"
              alt="Shopping woman"
              className="w-full h-auto rounded-lg"
              width="800"
              height="600"
            />
          </div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-gray-600">{header.description}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Suspense fallback={<LoadingFallback />}>
              {stats.map((stat) => (
                <StatItem key={stat.id} value={stat.value} label={stat.label} />
              ))}
            </Suspense>
          </div>
        </div>
      </Section>

      {/* Video Section */}
      <Section className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="relative rounded-lg overflow-hidden">
          <img
            loading="lazy"
            src="https://picsum.photos/1200/600?random=2"
            alt="Video thumbnail"
            className="w-full h-auto"
            width="1200"
            height="600"
          />
          <button 
            className="absolute inset-0 m-auto w-16 h-16 bg-[#23A6F0] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
            onClick={() => {
              // Video play logic
            }}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </Section>

      {/* Team Members Section */}
      <Section className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#252B42]">Meet Our Team</h2>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between items-center space-y-8 lg:space-y-0">
          <Suspense fallback={<LoadingFallback />}>
            {teamMembers.map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </Suspense>
        </div>
      </Section>

      {/* Companies Section */}
      <Section className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#252B42] mb-4">Big Companies Are Here</h2>
            <p className="text-sm lg:text-base text-gray-600">Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            <Suspense fallback={<LoadingFallback />}>
              {companies.map((company) => (
                <CompanyLogo key={company.id} company={company} />
              ))}
            </Suspense>
          </div>
        </div>
      </Section>

      {/* Growth Section */}
      <Section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-[#23A6F0] text-white p-8 lg:p-16">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">{growth.title}</h2>
            <p className="text-sm lg:text-base mb-6 lg:mb-8">{growth.description}</p>
            <button 
              className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-[#23A6F0] transition-colors"
              onClick={handleLearnMoreClick}
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="relative h-[400px] lg:h-auto">
          <img
            loading="lazy"
            src="https://picsum.photos/800/600?random=3"
            alt="Growth illustration"
            className="w-full h-full object-cover"
            width="800"
            height="600"
          />
        </div>
      </Section>
    </div>
  );
};

export default memo(AboutPage);
