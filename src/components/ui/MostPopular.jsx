import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
          <Card className="bg-purple-100 rounded-lg overflow-hidden h-full border-none shadow-none">
            <CardContent className="p-0 h-full">
              <AspectRatio ratio={4/3} className="h-full">
                <img
                  src="https://picsum.photos/seed/delivery/800/600"
                  alt="Delivery Service"
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </CardContent>
          </Card>

          {/* Right Side - Most Popular */}
          <div className="flex flex-col h-full items-center">
            <h2 className="text-2xl font-bold mb-2">MOST POPULAR</h2>
            <p className="text-gray-600 mb-8 text-center">
              We focus on ergonomics and meeting you where you work. It's only a keystroke away.
            </p>

            <Card className="bg-white rounded-lg shadow-lg overflow-hidden flex-grow w-full border-none">
              <CardContent className="p-0 h-full">
                <div className="h-3/5">
                  <AspectRatio ratio={4/3}>
                    <img
                      src="https://picsum.photos/seed/meat/400/300"
                      alt="Popular Product"
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
                <div className="p-6 items-center w-full flex flex-col align-center justify-center h-2/5 font-bold">
                  <h3 className="text-gray-600 mb-2">English Department</h3>
                  <div className="flex items-center">
                    <span className="text-gray-400 line-through mr-2">$16.48</span>
                    <span className="text-green-600">$6.48</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <Card key={step.number} className="text-center border-none shadow-none bg-transparent">
              <CardContent className="p-4">
                <div className="text-red-500 font-bold text-xl mb-2">{step.number}.</div>
                <h4 className="font-medium mb-1">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostPopular;
