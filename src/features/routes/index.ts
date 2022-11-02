import Categories from '@pages/categories'
import Dashboard from '@pages/dashboard'
import NotFound from '@pages/not-found'
import Orders from '@pages/orders'
import Products from '@pages/products'
import Reviews from '@pages/reviews'
import Users from '@pages/users'
import Vendors from '@pages/vendors'
import Signup from '@pages/signup'
import Signin from '@pages/signin'
import { SignUpIn } from '@features/layout'
import { routes } from './type'

const publicRoutes: Array<routes> = [
  { path: '/signup', component: Signup, layout: SignUpIn },
  { path: '/signin', component: Signin, layout: SignUpIn },
]

const adminRoutes: Array<routes> = [{ path: '/users', component: Users }]
const vendorRoutes: Array<routes> = [
  { path: '/categories', component: Categories },
  { path: '/', component: Dashboard },
  { path: '/orders', component: Orders },
  { path: '/products', component: Products },
  { path: '/reviews', component: Reviews },
  { path: '/vendors', component: Vendors },
]

export { publicRoutes, adminRoutes, vendorRoutes }
