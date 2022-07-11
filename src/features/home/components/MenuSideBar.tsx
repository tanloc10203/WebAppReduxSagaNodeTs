import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Box, IconButton } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import { KeyboardEvent, MouseEvent } from 'react';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  onToggleDrawer: (open: boolean) => (event: KeyboardEvent | MouseEvent) => void;
}

const BoxStyles = styled(Box)(({ theme }) => ({
  width: 270,
}));

export default function MenuSideBar(props: Props) {
  const { open, onToggleDrawer } = props;

  const drawer = (
    <BoxStyles
      role="presentation"
      onClick={onToggleDrawer(false)}
      onKeyDown={onToggleDrawer(false)}
    >
      <Toolbar sx={{ flexDirection: 'row-reverse' }}>
        <IconButton onClick={onToggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </BoxStyles>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onToggleDrawer(false)}
      onOpen={onToggleDrawer(true)}
    >
      {drawer}
    </SwipeableDrawer>
  );
}
