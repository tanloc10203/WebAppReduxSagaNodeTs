import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Iconify } from 'components/Common';
import { categoryActions, categorySelector } from 'features/category/categorySlice';
import { FilterPayload } from 'models';
import { ElementType, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export interface MenuItemState {
  path?: string;
  component?: ElementType | string;
  icon: string;
  title: string;
  onClick?: () => void;
}

export interface CategoryMoreMenuProps {
  categoryId: number;
  // menuItems: MenuItemState;
  level: number;
}

export function CategoryMoreMenu({ categoryId, level }: CategoryMoreMenuProps) {
  const ref = useRef<null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(categorySelector);

  const menuItems: Array<MenuItemState> = [
    {
      icon: 'eva:trash-2-outline',
      title: 'Delete',
      onClick: handleChange,
    },
    {
      path: '/dashboard/category/update/' + categoryId,
      component: RouterLink,
      icon: 'eva:edit-fill',
      title: 'Edit',
    },
    {
      path: '/dashboard/category/add/' + categoryId,
      component: RouterLink,
      icon: 'carbon:add-alt',
      title: 'Add New Children',
    },
    {
      icon: 'clarity:eye-show-line',
      title: 'Show Children Category',
      onClick: handleShowChildren,
    },
  ];

  function handleChange() {
    console.log('check click');
  }

  function handleShowChildren() {
    const newFilter: FilterPayload = {
      ...(filters as FilterPayload),
      level: level + 1,
      parentCatId: categoryId,
      _page: 0,
    };
    dispatch(categoryActions.setFilterCategory(newFilter));
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
