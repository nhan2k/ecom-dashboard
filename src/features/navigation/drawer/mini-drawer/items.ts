import { NavItemsInterface } from './type';
import { DashboardIcon } from '@assets/icons';
import { StarHalf as StarHalfIcon, AccountBox as AccountBoxIcon, Paid as PaidIcon, Tag as TagIcon, Book as BookIcon, TextFormat as TextFormatIcon, Abc as AbcIcon, DevicesOther as DevicesOtherIcon, ShoppingCart as ShoppingCartIcon, Category as CategoryIcon } from '@mui/icons-material';
const navMainItems: Array<NavItemsInterface> = [
  { Icon: DashboardIcon, label: 'dashboard', divider: true, link: '/' },
  { Icon: DevicesOtherIcon, label: 'product', divider: true, link: '/product' },
  { Icon: CategoryIcon, label: 'category', link: '/category' },
  { Icon: AbcIcon, label: 'product-category', link: '/product-category' },
  // { Icon: TextFormatIcon, label: 'product-meta', link: '/product-meta' },
  { Icon: StarHalfIcon, label: 'product-review', link: '/product-review' },
  { Icon: ShoppingCartIcon, label: 'order', divider: true, link: '/order' },
  // { Icon: BookIcon, label: 'product-tag', link: '/product-tag' },
  // { Icon: TagIcon, label: 'tag', divider: true, link: '/tag' },
  { Icon: PaidIcon, label: 'transaction', link: '/transaction' },
  { Icon: AccountBoxIcon, label: 'user', divider: true, link: '/user' },
];
const menuId: string = 'primary-search-account-menu';
const mobileMenuId: string = 'primary-search-account-menu-mobile';
const drawerWidth: number = 240;
const mails: number = 4;
const notifications: number = 17;

export { navMainItems, menuId, mobileMenuId, drawerWidth, mails, notifications };
