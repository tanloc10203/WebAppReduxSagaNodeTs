import { Box } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import SkeletonCustom from 'components/Skeleton';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const useStyles = makeStyles((theme: Theme) => ({
  swiper: {
    paddingBottom: 40,

    '& > .swiper-pagination-bullets': {
      position: 'absolute',
      bottom: -6,
    },
  },
}));

export default function LoadingContentCat() {
  const classes = useStyles();

  return (
    <Box mt={5}>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination]}
        className={classes.swiper}
      >
        {[...Array(6)].map((_, index) => (
          <SwiperSlide key={index}>
            <SkeletonCustom />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
