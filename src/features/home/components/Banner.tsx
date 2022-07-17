import { Grid } from '@mui/material';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { styled } from '@mui/material/styles';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface CarouselProps {}

const HEIGHT_LG = 416;
const HEIGHT_MD = 300;
const HEIGHT_SM = 150;

const ImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: HEIGHT_LG,
  objectFit: 'cover',
  objectPosition: 'center',
  height: '100%',
  transition: 'all 0.25s',
  [theme.breakpoints.down('md')]: {
    maxHeight: HEIGHT_MD,
  },
  [theme.breakpoints.up('md')]: {
    maxHeight: HEIGHT_MD,
  },
  [theme.breakpoints.down('sm')]: {
    maxHeight: HEIGHT_SM,
  },
  [theme.breakpoints.up('lg')]: {
    maxHeight: HEIGHT_LG,
  },
}));

const ImgStyleSideRight = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: (HEIGHT_LG - 16) / 2,
  objectFit: 'cover',
  objectPosition: 'center',
  height: '100%',
  transition: 'all 0.25s',
  [theme.breakpoints.down('sm')]: {
    maxHeight: 90,
  },
}));

export default function Banner(props: CarouselProps) {
  return (
    <Grid container spacing={2}>
      <Grid item lg={8} md={12} sm={12} xs={12}>
        <Swiper
          effect="fade"
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          className="mySwiper"
        >
          {[...Array(4)].map((x, i) => (
            <SwiperSlide key={i}>
              <ImgStyle
                loading="lazy"
                src={`https://swiperjs.com/demos/images/nature-${i + 1}.jpg`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>

      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={2}>
          <Grid item lg={12} md={6} sm={6} xs={6}>
            <ImgStyleSideRight
              loading="lazy"
              src="https://swiperjs.com/demos/images/nature-3.jpg"
            />
          </Grid>

          <Grid item lg={12} md={6} sm={6} xs={6}>
            <ImgStyleSideRight
              loading="lazy"
              src="https://swiperjs.com/demos/images/nature-4.jpg"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
