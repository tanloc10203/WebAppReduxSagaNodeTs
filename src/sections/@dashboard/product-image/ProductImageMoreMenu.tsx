import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { Iconify } from 'components/Common';
import { ElementType, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export interface MenuItemState {
  path?: string;
  component?: ElementType | string;
  icon: string;
  title: string;
  onClick?: () => void;
}

export interface ProductImageMoreMenuProps {
  productImgId: number;
}

export function ProductImageMoreMenu({ productImgId }: ProductImageMoreMenuProps) {
  const ref = useRef<null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuItems: Array<MenuItemState> = [
    {
      icon: 'eva:trash-2-outline',
      title: 'Delete',
      onClick: handleChange,
    },
    {
      path: '/dashboard/products/images/update/' + productImgId,
      component: RouterLink,
      icon: 'eva:edit-fill',
      title: 'Edit',
    },
  ];

  function handleChange() {
    console.log('check click');
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 250, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {menuItems.map((menu, index) => {
          const Component = menu.component as string | ElementType;

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
