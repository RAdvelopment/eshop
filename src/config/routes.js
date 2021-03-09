import Login from "../pages/admin/Login";
import Register from "../pages/admin/Login/Register";
import AdminPage from "../pages/admin/AdminPage";
import Landing from "../pages/Landing";
import Products from "../pages/admin/AdminPage/Products";
import Cart from "../pages/Cart";
import Users from "../pages/admin/AdminPage/Users";
import SelledPage from "../pages/admin/SelledPage";

const routes = [
  {
    path: "/",
    component: Landing,
    exact: true,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/shop",
    component: Cart,
    exact: true,
  },
  {
    path: "/register",
    component: Register,
    exact: true,
  },
  {
    path: "/admin",
    component: AdminPage,
    exact: false,
    routes: [
      {
        path: "/admin/products",
        component: Products,
        exact: true,
      },
      {
        path: "/admin/users",
        component: Users,
        exact: true,
      },
      {
        path: "/admin/selled",
        component: SelledPage,
        exact: true,
      },
    ],
  },
];

export default routes;
