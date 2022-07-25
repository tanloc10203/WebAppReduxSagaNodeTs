import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Box, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

const Quantity = () => {
  const [count, setCount] = useState(1);

  const IncNum = useCallback(() => {
    setCount((pre) => pre + 1);
  }, []);

  const DecNum = useCallback(() => {
    if (count > 1) setCount((pre) => pre - 1);
    else {
      setCount((pre) => 1);
      toast.error('min limit reached');
    }
  }, [count]);
  return (
    <Box mt={1} border="1px solid #dedede" display="inline-block">
      <Stack direction="row" alignItems="center" gap={1}>
        <Button onClick={IncNum} size="small">
          <AddIcon />
        </Button>

        <Typography fontWeight="bold">{count}</Typography>

        <Button onClick={DecNum} size="small">
          <RemoveIcon />
        </Button>
      </Stack>
    </Box>
  );
};
export default Quantity;
