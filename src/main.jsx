import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import TaskPage from './pages/TaskPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

const router=createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    
  },
  {
    path:"/tasks",
    element: <TaskPage/>,
    
  },
    {
    path:"/login",
    element: <LoginPage/>,
    
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
   
  </StrictMode>,
);
