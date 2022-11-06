import { NavItemsInterface } from './type';
// import { MoveToInbox as InboxIcon } from '@mui/icons-material'
import { DashboardIcon } from '@assets/icons';
import { PeopleAlt as PeopleAltIcon, PeopleOutline as PeopleOutlineIcon, Category as CategoryIcon, DonutSmall as DonutSmallIcon, ShoppingCartCheckout as ShoppingCartCheckoutIcon, StarHalf as StarHalfIcon } from '@mui/icons-material';

const navMainItems: Array<NavItemsInterface> = [
  { Icon: DashboardIcon, label: 'dashboard', divider: true, link: '/', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: DashboardIcon, label: 'Cart', divider: true, link: '/cart', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: DashboardIcon, label: 'cart-item', link: '/cart-item', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: DashboardIcon, label: 'category', divider: true, link: '/category', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: DashboardIcon, label: 'order', divider: true, link: '/order', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: DashboardIcon, label: 'order-item', link: '/order-item', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: DashboardIcon, label: 'product', divider: true, link: '/product', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: DashboardIcon, label: 'product-category', link: '/product-category', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: DashboardIcon, label: 'product-meta', link: '/product-meta', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: DashboardIcon, label: 'product-review', link: '/', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: DashboardIcon, label: 'product-tag', link: '/product-tag', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: DashboardIcon, label: 'tag', divider: true, link: '/tag', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: DashboardIcon, label: 'transaction', divider: true, link: '/transaction', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: DashboardIcon, label: 'user', divider: true, link: '/user', roleNav: ['VENDOR', 'ADMIN'] },
];
const menuId: string = 'primary-search-account-menu';
const mobileMenuId: string = 'primary-search-account-menu-mobile';
const drawerWidth: number = 240;
const mails: number = 4;
const notifications: number = 17;

export { navMainItems, menuId, mobileMenuId, drawerWidth, mails, notifications };
