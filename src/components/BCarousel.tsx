import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

type Slide = {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  category: string | number;
};

type HeroCarouselProps = {
  slides: Slide[];
};

const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides }) => {
  return (
    <div className="container" style={{ margin: "20px auto" }}>
      {slides?.length > 0 ? (
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 3000 }}
          spaceBetween={30}
          slidesPerView={1}
          className="swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} >
              <img src={slide.thumbnail} alt={slide.title} width={1080} height={800} loading="lazy" style={{ display: "block", margin: "0 auto" }} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No slides available</p>
      )}
    </div>
  );
};

export default HeroCarousel;
