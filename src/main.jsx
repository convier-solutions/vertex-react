import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { SidebarProvider } from './context/SidebarContext.jsx'
import { RolesProvider } from './context/RolesContext.jsx'
import router from './routes/router'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SidebarProvider>
      <RolesProvider>
        <RouterProvider router={router} />
      </RolesProvider>
    </SidebarProvider>
  </StrictMode>,
)
