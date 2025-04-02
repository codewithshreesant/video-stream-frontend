
import React from 'react'
import AdminSideBar from './AdminSideBar'
import { Outlet } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div className="flex">
        <AdminSideBar />
        <Outlet />
    </div>
  )
}

export default AdminDashboard