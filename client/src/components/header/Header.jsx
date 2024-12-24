import React from 'react';
import Logo from '../../assets/Logo.png';

export const Header = () => {
  return (
    <div style={styles.container}>
      <img src={Logo} alt="Logo" style={styles.logo} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80px',
    backgroundColor: '#f4f4f9',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    maxHeight: '60px',
    maxWidth: 'auto',
  },
};