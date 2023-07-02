import React from 'react';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../assets/logo-01.png';
import ProjectList from './ProjectList';


const Layout = () => {

  return (
    <Box display="flex" height="100vh" width="100vw">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width={75}
        bgcolor="grey.300"

      >
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Box marginTop="90px" display="flex" flexDirection="column" alignItems="center" width="100%">
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <Box bgcolor="primary.main" width="100%" display="flex" justifyContent="center">
            <IconButton>
              <BusinessCenterIcon />
            </IconButton>
          </Box>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end" flexDirection="column">
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Box>

      <Box width={200} bgcolor="grey.200">
        <Box display="flex" justifyContent="center" bgcolor="grey.200">
          <img src={logo} alt="logo" width="100px" />
        </Box>
        <Box display="flex" justifyContent="flex-start" bgcolor="grey.200">
          <IconButton>
            <AddIcon />
            <Typography variant="body2">New</Typography>
          </IconButton>
        </Box>

        <Divider />
        <ProjectList />
      </Box>

      <Box flexGrow={1} bgcolor="grey.100">
        {/* Main content goes here */}
      </Box>
    </Box>

  )
}

export default Layout
