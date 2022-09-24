import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import TakeAction from './pages/TakeAction';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import CreateTeam from './pages/CreateTeam';
import DashboardApp from './pages/DashboardApp';
import AllocateSpace from "./pages/AllocateSpace";
import BookSeat from "./pages/BookSeat";

// ----------------------------------------------------------------------

export default function Router() {
  let routes = []
  const isUserLoggedIn = sessionStorage.getItem('isUserLoggedIn')
  if(isUserLoggedIn){
    routes.push({
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'take-action', element: <TakeAction /> },
        { path: 'create-team', element: <CreateTeam /> },
        { path: 'allocate-fund', element: <AllocateSpace /> },
        { path: 'book-seat', element: <BookSeat /> },
        { path: 'login', element: <Login />},
        { path: 'register', element: <Register />},
      ],
    })
  }
  routes = [...routes,{
    path: '/',
    element: <LogoOnlyLayout />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },]
  return useRoutes(routes);
}
