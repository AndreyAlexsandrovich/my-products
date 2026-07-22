import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/Layout/Layout';
import Wardrobe from './pages/Wardrobe/Wardrobe';
import WardordeAdd from './pages/WardvorbeAdd/WardordeAdd';
import WardrobeDetail from './pages/WardrobeDetail/WardrobeDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Wardrobe />,
      },
      {
        path: '/wardrobe',
        element: <Wardrobe />,
      },
      {
        path: '/wardrobe/add',
        element: <WardordeAdd />,
      },
      {
        path: '/wardrobe/:id',
        element: <WardrobeDetail />,
      },
    ],
  },
]);