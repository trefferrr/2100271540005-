import React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <CircularProgress
            determinate={false}
            size="lg"
            value={60}
            variant="solid"
        />
    </div>
  );
};

export default Loader;
