import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ProductImagesAttribute } from 'models';
import { Typography } from '@mui/material';

export interface AlertDialogCloseProps {
  open: boolean;
  dataClose: ProductImagesAttribute;
  onClose?: () => void;
  onCloseData?: (value: ProductImagesAttribute) => void;
  onOpen?: () => void;
}

export default function AlertDialogClose(props: AlertDialogCloseProps) {
  const { open, onClose, onOpen, dataClose, onCloseData } = props;

  const handleClose = () => {
    if (!dataClose) return;

    onCloseData?.(dataClose);
  };

  return (
    <Dialog
      open={open}
      onClose={onOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h1" color="red">
          Cảnh báo!
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bạn có muốn xóa ảnh nay ko
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Disagree
        </Button>
        <Button onClick={handleClose}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
}
