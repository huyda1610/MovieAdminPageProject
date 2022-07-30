import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <CircularProgress
    size={100}
    sx={{
      position: 'absolute',
      top: '45%',
      left: '55%',
    }}
    />
  )
}

export default Loading