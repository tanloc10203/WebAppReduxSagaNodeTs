import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Badge, { BadgeProps } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import MenuSideBar from './MenuSideBar';

const APP_BAR_MOBILE = 64;

const RootStyle = styled(AppBar)(({ theme }) => ({
  bottom: 0,
  top: 'unset',
  position: 'fixed',
  display: 'none',
  right: 0,
  left: 0,
  padding: theme.spacing(1, 2),
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
  [theme.breakpoints.up('lg')]: {
    display: 'none',
    position: 'fixed',
    bottom: 0,
    zIndex: 1000,
    width: '100%',
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
  maxWidth: 400,
  margin: '0 auto',
  minHeight: APP_BAR_MOBILE,
}));

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function BottomAppBar() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleOnToggle = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenMenu(open);
  };

  return (
    <>
      <MenuSideBar open={openMenu} onToggleDrawer={handleOnToggle} />
      <RootStyle>
        <ToolbarStyle>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            sx={{ flexDirection: 'column' }}
            onClick={handleOnToggle(true)}
          >
            <MenuIcon />
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Menu
            </Typography>
          </IconButton>

          <IconButton color="inherit" aria-label="open drawer" sx={{ flexDirection: 'column' }}>
            <FormatListBulletedIcon />
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Category
            </Typography>
          </IconButton>

          <IconButton color="inherit" aria-label="open drawer" sx={{ flexDirection: 'column' }}>
            <StyledBadge badgeContent={4} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Cart
            </Typography>
          </IconButton>
        </ToolbarStyle>
      </RootStyle>
    </>
  );
}
