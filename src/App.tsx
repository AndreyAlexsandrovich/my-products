import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Wardrobe } from './pages/Wardrobe/Wardrobe';
import { WardrobeAdd } from './pages/WardvorbeAdd/WardordeAdd';
import { WardrobeDetail } from './pages/WardrobeDetail/WardrobeDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/my-products">
        <Routes>
          <Route path="/" element={<Navigate to="/wardrobe" />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/wardrobe/add" element={<WardrobeAdd />} />
          <Route path="/wardrobe/:id" element={<WardrobeDetail />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
}

export default App;