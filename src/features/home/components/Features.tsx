import CreditCardIcon from '@mui/icons-material/CreditCard';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import RedeemIcon from '@mui/icons-material/Redeem';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SyncIcon from '@mui/icons-material/Sync';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface FeaturesProps {}

const StackStyle = styled(Stack)(({ theme }) => ({
  marginTop: 40,
  border: `1px solid #dedede`,
  padding: 32,
  width: '100%',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',

  [theme.breakpoints.down('md')]: {
    justifyContent: 'flex-start',
  },
}));

const StackItemStyle = styled(Stack)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  padding: '0 15px',

  '&:first-of-type': {
    paddingLeft: 0,
  },

  '&:last-child': {
    paddingRight: 0,
  },

  [theme.breakpoints.down('md')]: {
    flexFlow: 'row wrap',
    marginBottom: 30,
    maxWidth: '33.3333%',
    padding: 0,
  },

  [theme.breakpoints.up('md')]: {
    flexFlow: 'row wrap',
    marginBottom: 30,
    maxWidth: '25%',
    padding: 0,
  },

  [theme.breakpoints.down('sm')]: {
    flexFlow: 'row nowrap',
    maxWidth: '100%',
    marginBottom: 30,
  },

  [theme.breakpoints.up(1024)]: {
    flexFlow: 'row wrap',
    maxWidth: '20%',
    marginBottom: 10,
  },
}));

export default function Features(props: FeaturesProps) {
  return (
    <StackStyle>
      <StackItemStyle>
        <RocketLaunchIcon fontSize="large" color="secondary" />
        <Box
          sx={{
            mt: { lg: 2, md: 2, sm: 2, xs: 0 },
            pl: { lg: 0, md: 0, sm: 0, xs: 3 },
            width: '100%',
          }}
        >
          <Typography variant="h6">Free Delivery</Typography>
          <Typography variant="caption">For all orders over 90.000 VND</Typography>
        </Box>
      </StackItemStyle>

      <StackItemStyle>
        <SyncIcon fontSize="large" color="secondary" />
        <Box
          sx={{
            mt: { lg: 2, md: 2, sm: 2, xs: 0 },
            pl: { lg: 0, md: 0, sm: 0, xs: 3 },
            width: '100%',
          }}
        >
          <Typography variant="h6">90 Days Return</Typography>
          <Typography variant="caption">If goods have problems</Typography>
        </Box>
      </StackItemStyle>

      <StackItemStyle>
        <CreditCardIcon fontSize="large" color="secondary" />
        <Box
          sx={{
            mt: { lg: 2, md: 2, sm: 2, xs: 0 },
            pl: { lg: 0, md: 0, sm: 0, xs: 3 },
            width: '100%',
          }}
        >
          <Typography variant="h6">Secure Payment</Typography>
          <Typography variant="caption">100% secure payment</Typography>
        </Box>
      </StackItemStyle>

      <StackItemStyle>
        <PermPhoneMsgIcon fontSize="large" color="secondary" />
        <Box
          sx={{
            mt: { lg: 2, md: 2, sm: 2, xs: 0 },
            pl: { lg: 0, md: 0, sm: 0, xs: 3 },
            width: '100%',
          }}
        >
          <Typography variant="h6">24/7 Support</Typography>
          <Typography variant="caption">Dedicated support</Typography>
        </Box>
      </StackItemStyle>

      <StackItemStyle>
        <RedeemIcon fontSize="large" color="secondary" />
        <Box
          sx={{
            mt: { lg: 2, md: 2, sm: 2, xs: 0 },
            pl: { lg: 0, md: 0, sm: 0, xs: 3 },
            width: '100%',
          }}
        >
          <Typography variant="h6">Gift Service</Typography>
          <Typography variant="caption">Support gift service</Typography>
        </Box>
      </StackItemStyle>
    </StackStyle>
  );
}
