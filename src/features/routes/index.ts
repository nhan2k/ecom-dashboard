import Signup from '@pages/signup';
import Signin from '@pages/signin';
import { SignUpIn } from '@features/layout';
import { IRoutes } from './type';
import Category from '@pages/category';
import Dashboard from '@pages/dashboard';
import Order from '@pages/order';
import OrderItem from '@pages/order-item';
import Product from '@pages/product';
import ProductCategory from '@pages/product-category';
import ProductMeta from '@pages/product-meta';
import ProductReview from '@pages/product-review';
import ProductTag from '@pages/product-tag';
import Tag from '@pages/tag';
import Transaction from '@pages/transaction';
import User from '@pages/users';

const publicRoutes: Array<IRoutes> = [
  { path: '/signup', component: Signup, layout: SignUpIn, isPublic: true },
  { path: '/signin', component: Signin, layout: SignUpIn, isPublic: true },
  { path: '/category', component: Category, isPublic: false, roleRoutes: ['VENDOR', 'ADMIN'] },
  { path: '/', component: Dashboard, isPublic: false, roleRoutes: ['VENDOR', 'ADMIN'] },
  { path: '/order', component: Order, isPublic: false, roleRoutes: ['VENDOR', 'ADMIN'] },
  { path: '/product', component: Product, isPublic: false, roleRoutes: ['VENDOR', 'ADMIN'] },
  { path: '/product-category', component: ProductCategory, isPublic: false, roleRoutes: ['VENDOR', 'ADMIN'] },
  { path: '/product-meta', component: ProductMeta, isPublic: false, roleRoutes: ['VENDOR', 'ADMIN'] },
  { path: '/product-review', component: ProductReview, isPublic: false, roleRoutes: ['VENDOR', 'ADMIN'] },
  { path: '/product-tag', component: ProductTag, isPublic: false, roleRoutes: ['VENDOR', 'ADMIN'] },
  { path: '/tag', component: Tag, isPublic: false, roleRoutes: ['VENDOR', 'ADMIN'] },
  { path: '/transaction', component: Transaction, isPublic: false, roleRoutes: ['VENDOR', 'ADMIN'] },
  { path: '/user', component: User, isPublic: false, roleRoutes: ['VENDOR', 'ADMIN'] },
];

export { publicRoutes };
