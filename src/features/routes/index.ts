import { SignUpIn } from '@features/layout';
import { IRoutes } from './type';
import Category from '@pages/category';
import Dashboard from '@pages/dashboard';
import Order from '@pages/order';
import Product from '@pages/product';
import ProductCategory from '@pages/product-category';
import ProductMeta from '@pages/product-meta';
import ProductReview from '@pages/product-review';
import ProductTag from '@pages/product-tag';
import Tag from '@pages/tag';
import Transaction from '@pages/transaction';
import User from '@pages/users';
import Signin from '@/pages/signin';

const publicRoutes: Array<IRoutes> = [
  { path: '/signin', component: Signin, layout: SignUpIn, isPublic: true },
  { path: '/', component: Dashboard, isPublic: false },
  { path: '/category', component: Category, isPublic: false },
  { path: '/order', component: Order, isPublic: false },
  { path: '/product', component: Product, isPublic: false },
  { path: '/product-category', component: ProductCategory, isPublic: false },
  { path: '/product-meta', component: ProductMeta, isPublic: false },
  { path: '/product-review', component: ProductReview, isPublic: false },
  // { path: '/product-tag', component: ProductTag, isPublic: false },
  // { path: '/tag', component: Tag, isPublic: false },
  { path: '/transaction', component: Transaction, isPublic: false },
  { path: '/user', component: User, isPublic: false },
];

export { publicRoutes };
