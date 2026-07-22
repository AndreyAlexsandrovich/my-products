import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/Layout/Layout';
import ItemsList from './pages/Wardrobe/Wardrobe';
import CreateItem from './pages/WardvorbeAdd/WardordeAdd';
import ItemDetail from './pages/WardrobeDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <ItemsList />,
      },
      {
        path: '/wardrobe',
        element: <ItemsList />,
      },
      {
        path: '/wardrobe/add',
        element: <CreateItem />,
      },
      {
        path: '/wardrobe/:id',
        element: <ItemDetail />,
      },
    ],
  },
]);