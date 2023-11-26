import { createBrowserRouter } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import ComponentsRoutes from './ComponentsRoutes';



// render - landing page

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    LoginRoutes,
    ComponentsRoutes,
    MainRoutes
  ],
  { basename: process.env.REACT_APP_BASE_NAME }
);

export default router;
