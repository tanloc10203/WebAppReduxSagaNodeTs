import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Button,
  Fade,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import { useAppSelector } from 'app/hooks';
import { categorySelector } from 'features/category/categorySlice';
import { Fragment, MouseEvent, useState } from 'react';
import CustomLink from './CustomLink';

export interface MenuHeaderProps {}

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

export default function MenuHeader(props: MenuHeaderProps) {
  const { dataTree, isFetching } = useAppSelector(categorySelector);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [openChildren, setOpenChildren] = useState<boolean>(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const loading =
    isFetching &&
    [...Array(4)].map((i, idex) => (
      <ListItemButton key={idex}>
        <Typography variant="h4">
          <Skeleton animation="wave" sx={{ pr: 10, pl: 16 }} />
        </Typography>
      </ListItemButton>
    ));

  const children =
    Boolean(dataTree) &&
    dataTree.length > 0 &&
    dataTree.map((item) => {
      if (!Boolean((item.children?.length as number) > 0))
        return (
          <ListItemButton key={item.id}>
            <CustomLink onClick={handleClose} to={`/category/${item.slug}`}>
              <ListItemText sx={{ pr: 10 }} primary={item.name} />
            </CustomLink>
          </ListItemButton>
        );

      return (
        <Fragment key={item.id}>
          <ListItemButton>
            <ListItemText
              sx={{ pr: 10 }}
              primary={item.name}
              onClick={() => setOpenChildren(!openChildren)}
            />
            {Boolean(item.children) && openChildren ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openChildren} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map((c) => (
                <ListItemButton sx={{ pl: 3 }} key={c.id}>
                  <CustomLink onClick={handleClose} to={`/category/${c.slug}`}>
                    <ListItemText primary={c.name} />
                  </CustomLink>
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Fragment>
      );
    });

  return (
    <StackStyle>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
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
        TransitionComponent={Fade}
      >
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {loading}

          {children}
        </List>
      </Menu>

      <Button variant="text" color="inherit" sx={{ ml: 2 }}>
        Blog
      </Button>
    </StackStyle>
  );
}
