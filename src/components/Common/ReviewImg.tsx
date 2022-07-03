import LightBox from 'react-awesome-lightbox';
import LazyLoadingImg from './LazyLoadingImg';

export interface IReviewImgProps {
  open: boolean;
  urlImg: string;
  onOpen: () => void;
  onClose: () => void;
}

export default function ReviewImg({ open, urlImg, onOpen, onClose }: IReviewImgProps) {
  return (
    <>
      <LazyLoadingImg
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
          position: 'unset !important',
          cursor: 'pointer',
        }}
        url={urlImg}
        onHandleClick={onOpen}
      />
      {open && <LightBox image={urlImg} onClose={onClose} />}
    </>
  );
}
