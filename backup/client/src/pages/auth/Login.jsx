import React from 'react';
import Logo from '../../assets/Logo.png';

export const Login = () => {
  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <img src={Logo} alt="Logo" style={styles.logo} />
      </div>
      <div style={styles.form}>
        <h2 style={styles.heading}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
        />
        <button style={styles.button}>Login</button>
        <a href="#" style={styles.link}>
          Forgot password?
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
  },
  logoContainer: {
    marginBottom: '20px',
  },
  logo: {
    maxWidth: '150px',
    height: 'auto',
  },
  form: {
    width: '300px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '20px',
    fontWeight: '500',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
  link: {
    display: 'block',
    marginTop: '15px',
    fontSize: '14px',
    color: '#007bff',
    textDecoration: 'none',
  },
};