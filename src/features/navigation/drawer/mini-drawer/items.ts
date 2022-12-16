import { NavItemsInterface } from './type';
import { DashboardIcon } from '@assets/icons';
import { StarHalf as StarHalfIcon, AccountBox as AccountBoxIcon, Paid as PaidIcon, Tag as TagIcon, Book as BookIcon, TextFormat as TextFormatIcon, Abc as AbcIcon, DevicesOther as DevicesOtherIcon, ShoppingCart as ShoppingCartIcon, Category as CategoryIcon } from '@mui/icons-material';
const navMainItems: Array<NavItemsInterface> = [
  { Icon: DashboardIcon, label: 'dashboard', divider: true, link: '/', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: CategoryIcon, label: 'category', divider: true, link: '/category', roleNav: ['ADMIN'] },
  { Icon: DevicesOtherIcon, label: 'product', divider: true, link: '/product', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: DevicesOtherIcon, label: 'product pending', link: '/product/pending', roleNav: ['ADMIN'] },
  { Icon: ShoppingCartIcon, label: 'order', divider: true, link: '/order', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: AbcIcon, label: 'product-category', link: '/product-category', roleNav: ['ADMIN'] },
  { Icon: TextFormatIcon, label: 'product-meta', link: '/product-meta', roleNav: ['ADMIN'] },
  { Icon: StarHalfIcon, label: 'product-review', link: '/product-review', roleNav: ['ADMIN'] },
  { Icon: BookIcon, label: 'product-tag', link: '/product-tag', roleNav: ['ADMIN'] },
  { Icon: TagIcon, label: 'tag', divider: true, link: '/tag', roleNav: ['ADMIN'] },
  { Icon: PaidIcon, label: 'transaction', divider: true, link: '/transaction', roleNav: ['VENDOR', 'ADMIN'] },
  { Icon: AccountBoxIcon, label: 'user', divider: true, link: '/user', roleNav: ['ADMIN'] },
];
const menuId: string = 'primary-search-account-menu';
const mobileMenuId: string = 'primary-search-account-menu-mobile';
const drawerWidth: number = 240;
const mails: number = 4;
const notifications: number = 17;

export { navMainItems, menuId, mobileMenuId, drawerWidth, mails, notifications };
