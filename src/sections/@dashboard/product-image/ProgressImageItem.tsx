import { CheckCircleOutline } from '@mui/icons-material';
import { Box, ImageListItem } from '@mui/material';
import { CircularProgressWithLabel } from 'features/dashboard/components';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { uploadFileProgress } from 'utils';

export interface ProgressImageItemProps {
  file: File;
  onGetUrl?: (values: string) => void;
}

const ProgressImageItem = ({ file, onGetUrl }: ProgressImageItemProps) => {
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (!file) return;

    (async () => {
      try {
        setImageURL(URL.createObjectURL(file));
        const url = await uploadFileProgress(file, 'images', setProgress);
        if (url) onGetUrl?.(url as string);
        setImageURL('');
      } catch (error) {
        toast.error('Upload Error');
        console.log(error);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <>
      {imageURL && (
        <ImageListItem cols={1} rows={1}>
          <img src={imageURL} alt="images gallery" loading="lazy" />
          <Box sx={backDrop}>
            {progress < 100 ? (
              <CircularProgressWithLabel value={progress} />
            ) : (
              <CheckCircleOutline sx={{ width: 60, height: 60, color: 'lightgreen' }} />
            )}
          </Box>
        </ImageListItem>
      )}
    </>
  );
};

export default ProgressImageItem;

const backDrop = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0,.5)',
};
