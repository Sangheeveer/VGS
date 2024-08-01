import React from 'react';
import { InfinitySpin } from 'react-loader-spinner'

const Loader = () => {
    const loaderStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        width: '100vw', 
        position: 'fixed', 
        top: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        zIndex: 9999, 
      };
    
      return (
        <div style={loaderStyle}>
          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      );
}

export default Loader;