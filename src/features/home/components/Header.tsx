import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { Logo } from 'components/Common';
import { AccountPopover, NotificationsPopover, SearchBar } from 'features/dashboard/components';
import MenuHeader from './MenuHeader';

interface Props {}

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.paper, 0.1),
  color: theme.palette.text.secondary,
  [theme.breakpoints.down('md')]: {
    position: 'unset',
    zIndex: 0,
  },
  [theme.breakpoints.up('md')]: {
    position: 'unset',
    zIndex: 0,
  },
  [theme.breakpoints.up('lg')]: {
    position: 'fixed',
    zIndex: 1000,
    width: '100%',
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APP_BAR_MOBILE,
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    minHeight: APP_BAR_DESKTOP,
    padding: theme.spacing(0, 1),
  },
  [theme.breakpoints.up('md')]: {
    minHeight: APP_BAR_DESKTOP,
    padding: theme.spacing(0, 3),
  },
  [theme.breakpoints.up('lg')]: {
    minHeight: APP_BAR_DESKTOP,
    padding: theme.spacing(0, 4),
  },
}));

export default function Header(props: Props) {
  return (
    <RootStyle>
      <ToolbarStyle>
        <Logo />

        <MenuHeader />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <SearchBar />
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
