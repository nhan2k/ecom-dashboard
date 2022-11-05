import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, List, CssBaseline, Typography, Divider, IconButton, Box, Badge } from '@mui/material';
import { Mail as MailIcon, Notifications as NotificationsIcon, MoreVert as MoreIcon, Search as SearchIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Menu, Avatar, Tooltip, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import DrawerHeader from './DrawerHeader';
import SearchIconWrapper from './SearchIconWrapper';
import StyledInputBase from './StyledInputBase';
import { navMainItems, mobileMenuId } from './items';
import Drawer from './Drawer';
import AppBar from './AppBar';
import Search from './Search';
import { MiniDrawerInterface } from './type';
import BasicBreadcrumbs from '@features/navigation/breadcrumbs';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { getAuthState } from '@/features/redux/slices/auth';

import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { removeItem } from '@/features/utils/local.storage';
import { resetAuthState } from '@features/redux/slices/auth';

const MiniDrawer: React.FunctionComponent<MiniDrawerInterface> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { role } = useAppSelector(getAuthState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleDrawerOpen = () => {
    console.log(mobileMoreAnchorEl);
    setOpen(true);
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSingout = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // call api logout

    dispatch(resetAuthState());
    removeItem('user');
    navigate('/signin');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            MUI
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <React.Fragment>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{ minWidth: 50 }}>
                  <MailIcon fontSize={'large'} />
                </Typography>
                <Typography sx={{ minWidth: 50 }}>
                  <NotificationsIcon fontSize={'large'} />
                </Typography>
                <Tooltip title="Account settings">
                  <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openMenu}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleSingout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
        </DrawerHeader>
        {navMainItems.map(({ Icon, label, divider, link, roleNav }, index) => {
          if (!roleNav.includes(role)) {
            return <React.Fragment key={index} />;
          }

          return (
            <React.Fragment key={index}>
              {divider && <Divider />}
              <List>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <Link to={link}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {<Icon />}
                      </ListItemIcon>
                      <ListItemText primary={label.toUpperCase()} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              </List>
            </React.Fragment>
          );
        })}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <DrawerHeader sx={{ justifyContent: 'flex-start' }}>
          <BasicBreadcrumbs />
        </DrawerHeader>
        {children}
      </Box>
    </Box>
  );
};

export default MiniDrawer;
