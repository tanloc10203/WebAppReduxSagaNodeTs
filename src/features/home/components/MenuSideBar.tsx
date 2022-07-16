import CloseIcon from '@mui/icons-material/Close';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Box, IconButton, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import { KeyboardEvent, MouseEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CustomLink from './CustomLink';

export interface HomePageState {
  name: string;
  path: string;
}

interface Props {
  open: boolean;
  onToggleDrawer: (open: boolean, isMenu: boolean) => (event: KeyboardEvent | MouseEvent) => void;
  dataHome: HomePageState[];
}

const BoxStyles = styled(Box)(({ theme }) => ({
  width: 270,
}));

export default function MenuSideBar(props: Props) {
  const { open, onToggleDrawer, dataHome } = props;

  const drawer = (
    <BoxStyles
      role="presentation"
      onClick={onToggleDrawer(false, true)}
      onKeyDown={onToggleDrawer(false, true)}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h3">Menu</Typography>

        <IconButton onClick={onToggleDrawer(false, true)}>
          <CloseIcon />
        </IconButton>
      </Toolbar>

      <Divider />

      <List>
        {dataHome.map((item, index) => (
          <CustomLink component={RouterLink} to={item.path} key={index}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </CustomLink>
        ))}
      </List>
    </BoxStyles>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onToggleDrawer(false, true)}
      onOpen={onToggleDrawer(true, true)}
    >
      {drawer}
    </SwipeableDrawer>
  );
}
