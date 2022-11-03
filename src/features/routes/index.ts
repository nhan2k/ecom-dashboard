import Categories from '@pages/categories';
import Dashboard from '@pages/dashboard';
import NotFound from '@pages/not-found';
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
  { path: '/categories', component: Categories, isPublic: false, role: [0, 1] },
  { path: '/users', component: Users, isPublic: false, role: [0, 1] },
  { path: '/', component: Dashboard, isPublic: false, role: [0, 1] },
  { path: '/orders', component: Orders, isPublic: false, role: [0, 1] },
  { path: '/products', component: Products, isPublic: false, role: [0, 1] },
  { path: '/reviews', component: Reviews, isPublic: false, role: [0, 1] },
  { path: '/vendors', component: Vendors, isPublic: false, role: [0, 1] },
];

export { publicRoutes };
