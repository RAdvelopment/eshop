import Login from "../pages/admin/Login";
import Register from "../pages/admin/Login/Register";
import AdminPage from "../pages/admin/AdminPage";
import Landing from "../pages/Landing";

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
    path: "/register",
    component: Register,
    exact: true,
  },
  {
    path: "/admin",
    component: AdminPage,
    exact: false,
  },
];

export default routes;
