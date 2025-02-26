import React from 'react';

const Sidebar = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Menu</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>Home</li>
        <li style={styles.listItem}>Add New Part</li>
        <li style={styles.listItem}>Overview</li>
      </ul>
    </div>
  );
};

const styles = {
  container: { 
    width: '200px',
    height: '100vh',
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px',
    'max-width':'20%',
    'max-height':'90%'
  },
  heading: {
    fontSize: '20px',
    marginBottom: '20px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
  },
  listItem: {
    padding: '10px 15px',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#fff',
    transition: 'background-color 0.3s',
  },
  listItemHover: {
    backgroundColor: '#575757',
  },
};

// Add hover effect
Object.assign(styles.listItem, {
  ':hover': {
    backgroundColor: '#575757',
  },
});

export default Sidebar;