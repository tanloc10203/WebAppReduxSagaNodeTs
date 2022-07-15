import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Button,
  Fade,
  Link,
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
import { CategoryAttribute } from 'models';
import { MouseEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
    if (Boolean(anchorEl)) setAnchorEl(null);

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
        MenuListProps={
          {
            // onMouseLeave: handleClose,
          }
        }
        TransitionComponent={Fade}
      >
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {isFetching &&
            [...Array(4)].map((i) => (
              <ListItemButton key={i}>
                <Typography variant="h4">
                  <Skeleton animation="wave" sx={{ pr: 10, pl: 16 }} />
                </Typography>
              </ListItemButton>
            ))}

          {Boolean(dataTree) &&
            dataTree.length > 0 &&
            dataTree.map((item) => {
              if (Boolean(item.children) && (item.children as CategoryAttribute[])?.length > 0)
                return (
                  <>
                    <ListItemButton key={item.id}>
                      {Boolean(item.children) ? (
                        <>
                          {' '}
                          <ListItemText
                            sx={{ pr: 10 }}
                            primary={item.name}
                            onClick={() => Boolean(item.children) && setOpenChildren(!openChildren)}
                          />
                          {Boolean(item.children) && openChildren ? <ExpandLess /> : <ExpandMore />}
                        </>
                      ) : (
                        <Link
                          component={RouterLink}
                          to={item.slug as string}
                          style={{ display: 'flex', width: '100%' }}
                        >
                          <ListItemText
                            sx={{ pr: 10 }}
                            primary={item.name}
                            onClick={() => Boolean(item.children) && setOpenChildren(!openChildren)}
                          />
                          {Boolean(item.children) && openChildren ? <ExpandLess /> : <ExpandMore />}
                        </Link>
                      )}
                    </ListItemButton>

                    <Collapse in={openChildren} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.children?.map((c) => (
                          <ListItemButton sx={{ pl: 3 }}>
                            <Link
                              component={RouterLink}
                              to={c.slug as string}
                              style={{ display: 'flex', width: '100%' }}
                            >
                              <ListItemText primary={c.name} />
                            </Link>
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </>
                );

              return (
                <ListItemButton key={item.id}>
                  <Link
                    component={RouterLink}
                    to={item.slug as string}
                    style={{ display: 'flex', width: '100%' }}
                  >
                    <ListItemText sx={{ pr: 10 }} primary={item.name} />
                  </Link>
                </ListItemButton>
              );
            })}
        </List>
      </Menu>

      <Button variant="text" color="inherit" sx={{ ml: 2 }}>
        Blog
      </Button>
    </StackStyle>
  );
}
