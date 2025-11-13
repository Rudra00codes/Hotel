import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface CarouselImage {
  src: string;
  alt: string;
  title: string;
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
      alt: "Illustrations by ©AarzooAly",
      title: "Block Reader",
    },
    {
      src: "/images/x.com/9.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Forest Fungi",
    },
    {
      src: "/images/x.com/20.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Golden Dusk",
    },
    {
      src: "/images/x.com/21.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Silent Peaks",
    },
    {
      src: "/images/x.com/25.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Emerald Woods",
    },
    {
      src: "/images/x.com/32.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Falling Mist",
    },
    {
      src: "/images/x.com/19.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Midnight Veil",
    },
    {
      src: "/images/x.com/3.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Azure Ridge",
    },
    {
      src: "/images/x.com/2.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Cloud Summit",
    },
  ];

  const images = customImages || defaultImages;
  const [current, setCurrent] = useState(0);

  const plugins = autoplay
    ? [
        Autoplay({
          delay: 1500,
          stopOnInteraction: false,
          stopOnMouseEnter: false,
        }),
      ]
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      align: "center",
      slidesToScroll: 1,
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
        <div className="flex h-[500px] w-full">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative flex h-[81.5%] min-w-0 flex-[0_0_73%] items-center justify-center sm:flex-[0_0_50%] md:flex-[0_0_30%] lg:flex-[0_0_25%] xl:flex-[0_0_21%]"
            >
              <motion.div
                initial={false}
                animate={{
                  clipPath:
                    current !== index
                      ? "inset(15% 0% 15% 0% round 2rem)"
                      : "inset(0% 0% 0% 0% round 2rem)",
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-full w-full overflow-hidden rounded-3xl"
              >
                <div className="relative h-full w-full border border-gray-200">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full scale-105 object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
              <AnimatePresence mode="wait">
                {current === index && (
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.5 }}
                    className="absolute bottom-0 left-2 flex h-[14%] w-full translate-y-full items-center justify-center p-2 text-center font-grotesk font-medium tracking-tight text-gray-700"
                  >
                    {img.title}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {showNavigation && (
        <div className="absolute -bottom-4 right-0 flex w-full items-center justify-between gap-2 px-4">
          <button
            aria-label="Previous slide"
            onClick={scrollPrev}
            className="rounded-full bg-black/10 p-2 hover:bg-black/20 transition-colors touch-target"
          >
            <ChevronLeft className="text-gray-700 w-5 h-5" />
          </button>
          <button
            aria-label="Next slide"
            onClick={scrollNext}
            className="rounded-full bg-black/10 p-2 hover:bg-black/20 transition-colors touch-target"
          >
            <ChevronRight className="text-gray-700 w-5 h-5" />
          </button>
        </div>
      )}

      {showPagination && (
        <div className="hidden md:flex w-full items-center justify-center mt-0">
          <div className="flex items-center justify-center gap-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 w-2 cursor-pointer rounded-full transition-all ${
                  current === index ? "bg-black w-6" : "bg-gray-300"
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

