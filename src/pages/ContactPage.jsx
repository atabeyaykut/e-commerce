import React from 'react';
import PageHeader from '../components/ui/PageHeader';

const ContactPage = () => {
  const breadcrumbs = [
    { text: 'Home', url: '/' },
    { text: 'Contact', url: '/contact' }
  ];

  return (
    <div className="flex flex-col">
      <div className="relative h-160 bg-gray-50">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/1920/400?random=1"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-[40px] font-bold text-[#252B42] mb-4">Questions & Answers</h1>
          <p className="text-[#737373] text-sm max-w-md mx-auto">
            Problems trying to resolve the conflict between the two major realms of Classical physics.
          </p>
          <button className="mt-6 px-10 py-3 bg-[#23A6F0] text-white rounded-md hover:bg-blue-600 transition-colors">
            CONTACT US
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
