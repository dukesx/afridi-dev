import useEmblaCarousel from "embla-carousel-react";
import { ReactNode } from "react";

interface GlobalCarouselProps {
  children: Array<any>;
}
const GlobalCarousel: React.FC<GlobalCarouselProps> = ({ children }) => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
  });
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">{children}</div>
    </div>
  );
};

export default GlobalCarousel;
