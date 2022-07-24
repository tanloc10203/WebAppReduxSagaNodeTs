import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { Iconify } from 'components/Common';
import { productImgActions } from 'features/productImage/productImageSlice';
import { ProductImagesAttribute } from 'models';
import { ElementType, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AlertDialogClose from './AlertDialogClose';

export interface MenuItemState {
  path?: string;
  component?: ElementType | string;
  icon: string;
  title: string;
  onClick?: () => void;
}

export interface ProductImageMoreMenuProps {
  productImgId: number;
  data: ProductImagesAttribute;
}

export function ProductImageMoreMenu({ productImgId, data }: ProductImageMoreMenuProps) {
  const ref = useRef<null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

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
    setOpen(true);
  }

  const handleCloseData = () => {
    if (!data) return;
    setOpen(false);
    dispatch(productImgActions.fetchDeleteProductImgStart(data));
  };

  return (
    <>
      <AlertDialogClose
        open={open}
        dataClose={data}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        onCloseData={handleCloseData}
      />

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
