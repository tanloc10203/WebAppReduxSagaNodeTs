import { CheckCircleOutline } from '@mui/icons-material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { uploadFileProgress } from 'utils';
import CircularProgressWithLabel from '../CircularProgressWithLabel';

export interface UploadImageProductProps {
  file: File;
  onGetUrl?: (value: string) => void;
}

export default function UploadImageProduct(props: UploadImageProductProps) {
  const { file, onGetUrl } = props;

  const [progress, setProgress] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!file) return;

    (async () => {
      try {
        setImageUrl(URL.createObjectURL(file));
        const url = await uploadFileProgress(file, 'images', setProgress);
        onGetUrl?.(url as string);
        setImageUrl('');
      } catch (error) {
        toast.error('Upload Error');
        console.log(error);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <>
      {imageUrl && (
        <Box
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
            position: 'relative',
          }}
        >
          <img src={imageUrl} alt="images gallery" loading="lazy" />
          <Box sx={backDrop}>
            {progress < 100 ? (
              <CircularProgressWithLabel value={progress} />
            ) : (
              <CheckCircleOutline sx={{ width: 60, height: 60, color: 'lightgreen' }} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

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
