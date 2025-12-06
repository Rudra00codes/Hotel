import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface CarouselImage {
  src: string;
  alt: string;
}

interface ClipPathCarouselProps {
  images?: CarouselImage[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

export default function ClipPathCarousel({
  images: customImages,
  className = "",
  autoplay = true,
  loop = true,
  showNavigation = true,
  showPagination = true,
}: ClipPathCarouselProps) {
  const defaultImages: CarouselImage[] = [
    {
      src: "/images/x.com/13.jpeg",
      alt: "Hotel Interior",
    },
    {
      src: "/images/x.com/9.jpeg",
      alt: "Luxury Room",
    },
    {
      src: "/images/x.com/20.jpeg",
      alt: "Evening View",
    },
    {
      src: "/images/x.com/21.jpeg",
      alt: "Hotel Exterior",
    },
    {
      src: "/images/x.com/25.jpeg",
      alt: "Garden Area",
    },
    {
      src: "/images/x.com/32.jpeg",
      alt: "Dining Area",
    },
    {
      src: "/images/x.com/19.jpeg",
      alt: "Night Ambience",
    },
    {
      src: "/images/x.com/3.jpeg",
      alt: "Reception",
    },
    {
      src: "/images/x.com/2.jpeg",
      alt: "Lobby",
    },
  ];

  const images = customImages || defaultImages;
  const [current, setCurrent] = useState(0);

  const plugins = autoplay
    ? [
        Autoplay({
          delay: 1000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      align: "center",
      slidesToScroll: 1,
      skipSnaps: false,
      dragFree: false,
    },
    plugins
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrent(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className={`relative w-full ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex h-[500px] w-full touch-pan-y">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative flex h-[81.5%] min-w-0 flex-[0_0_73%] items-center justify-center sm:flex-[0_0_50%] md:flex-[0_0_30%] lg:flex-[0_0_25%] xl:flex-[0_0_21%]"
            >
              <div
                className={`h-full w-full overflow-hidden rounded-3xl transition-all duration-500 ease-out will-change-[clip-path] ${
                  current === index
                    ? "opacity-100"
                    : "opacity-70"
                }`}
                style={{
                  clipPath: current === index 
                    ? "inset(0% 0% 0% 0% round 2rem)" 
                    : "inset(10% 5% 10% 5% round 2rem)"
                }}
              >
                <div className="relative h-full w-full border border-gray-200/20">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showNavigation && (
        <div className="absolute -bottom-4 right-0 flex w-full items-center justify-between gap-2 px-4 pointer-events-none">
          <button
            aria-label="Previous slide"
            onClick={scrollPrev}
            className="pointer-events-auto rounded-full bg-white/80 backdrop-blur-sm p-3 shadow-sm hover:bg-white transition-all active:scale-95"
          >
            <ChevronLeft className="text-gray-800 w-5 h-5" />
          </button>
          <button
            aria-label="Next slide"
            onClick={scrollNext}
            className="pointer-events-auto rounded-full bg-white/80 backdrop-blur-sm p-3 shadow-sm hover:bg-white transition-all active:scale-95"
          >
            <ChevronRight className="text-gray-800 w-5 h-5" />
          </button>
        </div>
      )}

      {showPagination && (
        <div className="hidden md:flex w-full items-center justify-center mt-4">
          <div className="flex items-center justify-center gap-2 bg-black/5 backdrop-blur-sm px-4 py-2 rounded-full">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 w-2 cursor-pointer rounded-full transition-all duration-300 ${
                  current === index ? "bg-gray-900 scale-125" : "bg-gray-400 hover:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

