import React from 'react';

const MostPopular = () => {
  const steps = [
    {
      number: 1,
      title: 'Easy to use',
      description: 'Things on a very small that you have any direct'
    },
    {
      number: 2,
      title: 'Easy to use',
      description: 'Things on a very small that you have any direct'
    },
    {
      number: 3,
      title: 'Easy to use',
      description: 'Things on a very small that you have any direct'
    },
    {
      number: 4,
      title: 'Easy to use',
      description: 'Things on a very small that you have any direct'
    }
  ];

  return (
    <div className='pb-10'>
      {/* Most Popular Section */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[650px]">
          {/* Left Side - Delivery Image */}
          <div className="bg-purple-100 rounded-lg overflow-hidden h-full">
            <img
              src="https://picsum.photos/seed/delivery/800/600"
              alt="Delivery Service"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side - Most Popular */}
          <div className="flex flex-col h-full items-center">
            <h2 className="text-2xl font-bold mb-2">MOST POPULAR</h2>
            <p className="text-gray-600 mb-8">
              We focus on ergonomics and meeting you where you work. It's only a keystroke away.
            </p>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-grow w-full">
              <div className="h-3/5">
                <img
                  src="https://picsum.photos/seed/meat/400/300"
                  alt="Popular Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 items-center w-full flex flex-col align-center justify-center h-2/5 font-bold">
                <h3 className="text-gray-600 mb-2">English Department</h3>
                <div className="flex items-center">
                  <span className="text-gray-400 line-through mr-2">$16.48</span>
                  <span className="text-green-600">$6.48</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="text-red-500 font-bold text-xl mb-2">{step.number}.</div>
              <h4 className="font-medium mb-1">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostPopular;
