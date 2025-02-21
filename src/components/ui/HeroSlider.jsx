import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image: 'https://picsum.photos/1920/1080?random=1',
      title: 'Summer Collection',
      description: 'New Arrivals For Summer',
      buttonText: 'SHOP NOW',
      link: '/shop'
    },
    {
      id: 2,
      image: 'https://picsum.photos/1920/1080?random=2',
      title: 'Winter Collection',
      description: 'New Arrivals For Winter',
      buttonText: 'SHOP NOW',
      link: '/shop'
    },
    {
      id: 3,
      image: 'https://picsum.photos/1920/1080?random=3',
      title: 'Spring Collection',
      description: 'New Arrivals For Spring',
      buttonText: 'SHOP NOW',
      link: '/shop'
    }
  ];

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <Carousel 
      ref={emblaRef}
      className="w-full"
      opts={{
        align: 'start',
        loop: true,
      }}
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <AspectRatio ratio={16/9} className="relative overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl mb-8">{slide.description}</p>
                <Button 
                  asChild
                  variant="outline" 
                  size="lg"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
                >
                  <Link to={slide.link}>
                    {slide.buttonText}
                  </Link>
                </Button>
              </div>
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/40 text-white border-none" />
      <CarouselNext className="right-4 bg-white/20 hover:bg-white/40 text-white border-none" />
    </Carousel>
  );
};

export default HeroSlider;
