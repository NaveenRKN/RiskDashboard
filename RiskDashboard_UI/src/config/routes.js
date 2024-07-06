import Login from "./container/login/Login";
import Dashboard from "./container/dashboard/Dashboard";
var routes = [
  { path: "/dashboard", component: Dashboard, layout: "/app" },
  { path: "/login", component: Login, layout: "/" },
  { path: "/**", component: Login, layout: "" },
];
export default routes;
