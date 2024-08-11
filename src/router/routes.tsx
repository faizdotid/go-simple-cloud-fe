import { createBrowserRouter } from 'react-router-dom';
import { IndexPage } from '../pages/Index';
import { FilePage } from '../pages/File';
import { NotFoundPage } from '../pages/404';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/file/:id',
    element: <FilePage />,
  },
]);
