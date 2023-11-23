import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/UserContext/UserContext'
import { PATH } from '../../routes/path';

const AdminLayout = () => {
  const { currentUser } = useAuth();
  console.log('currentUser: ', currentUser);

  if ( currentUser && currentUser.maLoaiNguoiDung ==="QuanTri" ) {
    return (
      <div>
        <Outlet/>
      </div>
    )
  }
  return <Navigate to={PATH.HOME}/>
  
}

export default AdminLayout