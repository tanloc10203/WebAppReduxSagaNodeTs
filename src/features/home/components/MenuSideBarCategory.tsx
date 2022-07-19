import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Collapse, IconButton, Skeleton, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import { CategoryAttribute } from 'models';
import { Fragment, KeyboardEvent, MouseEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CustomLink from './CustomLink';

interface Props {
  open: boolean;
  onToggleDrawer: (open: boolean, isMenu: boolean) => (event: KeyboardEvent | MouseEvent) => void;
  data: CategoryAttribute[];
  isFetching: boolean;
}

const BoxStyles = styled(Box)(({ theme }) => ({
  width: 270,
}));

export default function MenuSideBarCategory(props: Props) {
  const { open, onToggleDrawer, data, isFetching } = props;

  const [openChildren, setOpenChildren] = useState<boolean>(false);

  const loading =
    isFetching &&
    [...Array(4)].map((i, idex) => (
      <ListItemButton key={idex}>
        <Typography variant="h4">
          <Skeleton animation="wave" sx={{ pr: 10, pl: 16 }} />
        </Typography>
      </ListItemButton>
    ));

  const drawer = (
    <BoxStyles role="presentation" onKeyDown={onToggleDrawer(false, false)}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h3">Category</Typography>

        <IconButton onClick={onToggleDrawer(false, false)}>
          <CloseIcon />
        </IconButton>
      </Toolbar>

      <Divider />

      <List>
        {loading}

        {Boolean(data) &&
          data.map((item, index) => {
            if (!Boolean((item.children?.length as number) > 0))
              return (
                <CustomLink component={RouterLink} to={`/category/${item.slug}`} key={index}>
                  <ListItem onClick={onToggleDrawer(false, false)} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </ListItem>
                </CustomLink>
              );

            return (
              <Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setOpenChildren(!openChildren)}>
                    <ListItemText primary={item.name} />
                    {openChildren ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>

                <Collapse in={openChildren} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children?.map((c) => (
                      <CustomLink component={RouterLink} to={`/category/${c.slug}`} key={index}>
                        <ListItem onClick={onToggleDrawer(false, false)} disablePadding>
                          <ListItemButton>
                            <ListItemText primary={c.name} sx={{ pl: 4 }} />
                          </ListItemButton>
                        </ListItem>
                      </CustomLink>
                    ))}
                  </List>
                </Collapse>
              </Fragment>
            );
          })}
      </List>
    </BoxStyles>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onToggleDrawer(false, false)}
      onOpen={onToggleDrawer(true, false)}
    >
      {drawer}
    </SwipeableDrawer>
  );
}
