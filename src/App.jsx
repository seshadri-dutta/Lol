import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AppLayout from "./layouts/app-layout";
import Home from "./pages/home";
import Category from './pages/category';
import Search from './pages/search';
import GifPage from './pages/single-gif';
import Favorites from './pages/favorites';
import GifProvider from './context/gif-context';


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/category/:category", element: <Category /> },
      { path: "/favorites", element: <Favorites /> }, // 
      { path: "/search/:query", element: <Search /> },
      { path: "/:type/:slug", element: <GifPage /> },
    ],
  },
]);

function App() {
  return (
    <GifProvider>
      
      <div className="min-h-screen w-full">
        <RouterProvider router={router} />
      </div>
    </GifProvider>
  );
}

export default App;
