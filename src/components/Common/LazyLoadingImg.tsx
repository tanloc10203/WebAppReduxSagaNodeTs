import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MouseEventHandler, useEffect, useRef } from 'react';

const useStyles = makeStyles((theme) => ({
  lazyLoading: {
    transition: '0.5s ease-in-out',
    opacity: 0,
    visibility: 'hidden',
    background: 'rgba(0,0,0,0.2)',

    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',

    '&.active': {
      opacity: 1,
      visibility: 'visible',
    },
  },
}));

export interface LazyLoadingImgProps {
  url: string;
  alt?: string;
  sx?: Object;
  onHandleClick?: (event: MouseEventHandler<HTMLImageElement>) => void;
}

export default function LazyLoadingImg({ url, alt, sx, onHandleClick }: LazyLoadingImgProps) {
  const classes = useStyles();

  const imgRef = useRef<null>(null);

  useEffect(() => {
    const img = imgRef.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        img && (img as Element).setAttribute('src', url);
        img && (img as Element).classList.add('active');
      }
    });

    if (img) {
      observer.observe(img);
    }

    return () => {
      if (img) observer.unobserve(img);
    };
  }, [url]);

  return (
    <Box
      onClick={onHandleClick as MouseEventHandler<HTMLImageElement> | undefined}
      component="img"
      sx={sx}
      alt={alt}
      ref={imgRef}
      className={classes.lazyLoading}
    />
  );
}
