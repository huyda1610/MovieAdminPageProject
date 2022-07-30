import { Outlet } from 'react-router-dom'
import Sidebar from '../../Components/sidebar/Sidebar';
import Navbar from "../../Components/navbar/Navbar";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function HomeTemplate() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={2}>
          <Sidebar/>
        </Grid>
        <Grid item xs={10}>
          <Navbar/>
          <Outlet />
        </Grid>
      </Grid>
    </Box>    
  )
}

export default HomeTemplate