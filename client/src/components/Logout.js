import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

  return (
    <div>
      <Button variant='contained' color="primary" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  )
}

export default Logout
