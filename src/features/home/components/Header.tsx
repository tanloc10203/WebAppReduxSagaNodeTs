import { Button, Fade, Menu, MenuItem, MenuList, Paper, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { Logo } from 'components/Common';
import { AccountPopover, NotificationsPopover, SearchBar } from 'features/dashboard/components';
import { MouseEvent, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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

const StackStyle = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
  },
}));

export default function Header(props: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <RootStyle>
      <ToolbarStyle>
        <Logo />

        <StackStyle>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onMouseOver={handleClick}
            color="inherit"
            endIcon={<KeyboardArrowDownIcon />}
          >
            Danh mục
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              onMouseLeave: handleClose,
            }}
            TransitionComponent={Fade}
          >
            <MenuItem sx={{ pl: 2, pr: 10 }} onClick={handleClose}>
              Profile
            </MenuItem>
            <MenuItem sx={{ pl: 2, pr: 10 }} onClick={handleClose}>
              My account
            </MenuItem>
            <MenuItem sx={{ pl: 2, pr: 10 }} onClick={handleClose}>
              Logout
            </MenuItem>
          </Menu>
          <Button variant="text" color="inherit" sx={{ ml: 2 }}>
            Blog
          </Button>
        </StackStyle>

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <SearchBar />
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
