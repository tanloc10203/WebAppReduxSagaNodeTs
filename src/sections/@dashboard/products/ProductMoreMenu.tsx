import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SpeedDialIcon,
} from '@mui/material';
import { Iconify } from 'components/Common';
import { KeyStatusProduct } from 'models';
import { ElementType, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { MenuItemState } from '../category';

export interface ProductMoreMenuProps {
  productId: number;
  priceId: number;
  status: KeyStatusProduct;
}

export default function ProductMoreMenu({ status, productId, priceId }: ProductMoreMenuProps) {
  const ref = useRef<null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuItems: Array<MenuItemState> = [
    {
      icon: 'eva:trash-2-outline',
      title: 'Delete',
    },
    {
      path: '/dashboard/products/add/' + productId,
      component: RouterLink,
      icon: 'eva:edit-fill',
      title: 'Edit',
    },
    {
      path: '/dashboard/products/update/price/' + productId,
      component: RouterLink,
      icon: 'carbon:add-filled',
      title: 'Add Price',
    },
    {
      path: '/dashboard/products/update/price/' + productId + '/' + priceId,
      component: RouterLink,
      icon: 'material-symbols:price-check-rounded',
      title: 'Update Price',
    },
    {
      // path: '/dashboard/products/update/price/' + productId + '/' + priceId,
      // component: RouterLink,
      icon: 'bx:image-add',
      title: 'Add List Image',
    },
  ];

  const checkColor = status === 'show' ? { color: 'text.secondary' } : { color: 'white' };
  const checkBg =
    status === 'show'
      ? { background: 'text.secondary' }
      : status === 'hide'
      ? { background: '#FF4949' }
      : { background: '#FFCD38' };

  return (
    <>
      <IconButton sx={checkBg} ref={ref} onClick={() => setIsOpen(true)}>
        <SpeedDialIcon sx={checkColor} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {menuItems.map((menu, index) => {
          const Component = menu.component as string | ElementType;

          if (Boolean(priceId) && menu.title === 'Add Price') {
            return null;
          }

          return (
            <MenuItem
              key={index}
              component={Component as ElementType}
              to={menu.path}
              sx={{ color: 'text.secondary' }}
              onClick={menu.onClick}
            >
              <ListItemIcon>
                <Iconify icon={menu.icon} width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary={menu.title} primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
