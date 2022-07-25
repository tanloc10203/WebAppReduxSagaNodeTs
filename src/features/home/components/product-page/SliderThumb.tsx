import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Box } from '@mui/material';
import { ProductImagesAttribute } from 'models';

export default function SliderThumb({ images }: { images: Array<ProductImagesAttribute> }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(undefined);

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((t, i) => (
          <SwiperSlide key={i}>
            <img src={t.urlImg} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Box mt={2}>
        <Swiper
          onSwiper={setThumbsSwiper as any}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {images.map((t, i) => (
            <SwiperSlide key={i} style={{ cursor: 'pointer' }}>
              <img src={t.urlImg} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
