import Categories from '@pages/categories';
import Dashboard from '@pages/dashboard';
import Orders from '@pages/orders';
import Products from '@pages/products';
import Reviews from '@pages/reviews';
import Users from '@pages/users';
import Vendors from '@pages/vendors';
import Signup from '@pages/signup';
import Signin from '@pages/signin';
import { SignUpIn } from '@features/layout';
import { IRoutes } from './type';

const publicRoutes: Array<IRoutes> = [
  { path: '/signup', component: Signup, layout: SignUpIn, isPublic: true },
  { path: '/signin', component: Signin, layout: SignUpIn, isPublic: true },
  { path: '/categories', component: Categories, isPublic: false, roleRoutes: ['VENDOR', 'ADMIN'] },
  { path: '/users', component: Users, isPublic: false, roleRoutes: ['ADMIN'] },
  { path: '/', component: Dashboard, isPublic: false, roleRoutes: ['VENDOR', 'ADMIN'] },
  { path: '/orders', component: Orders, isPublic: false, roleRoutes: ['VENDOR'] },
  { path: '/products', component: Products, isPublic: false, roleRoutes: ['VENDOR', 'ADMIN'] },
  { path: '/reviews', component: Reviews, isPublic: false, roleRoutes: ['VENDOR', 'ADMIN'] },
  { path: '/vendors', component: Vendors, isPublic: false, roleRoutes: ['VENDOR', 'ADMIN'] },
];

export { publicRoutes };
