import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

type Slide = {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  category: number;
  category_name: string;
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
                <Link to={`/mangaDetails/?manga=${slide.id}&category=${slide.category_name}`} key={slide.id}>
                <img src={slide.thumbnail} alt={slide.title} width={900} height={750} loading="lazy" style={{ display: "block", margin: "0 auto" }} />
                <p style={{ position: "absolute", bottom: "50px", left: "150px", color: "#fff", fontSize: "24px", background: "grey" }}>{slide.title}</p>
                </Link>
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
