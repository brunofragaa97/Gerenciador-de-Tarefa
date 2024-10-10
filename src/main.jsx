import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TaskPage from './pages/TaskPage.jsx'  // Adicionar esta linha para importar o TaskPage

const router = createBrowserRouter([
  {
    path: "/inicio",
    element: <App />
  },
  {
    path: '/task',
    element: <TaskPage />  // Agora o TaskPage foi corretamente referenciado
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
