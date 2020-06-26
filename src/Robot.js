import React, { useEffect, useState } from 'react';


const Robot = ({robotKey}) => {
  const styles = {
    robotStyle: {
      width: '30px',
      height: '30px',
      display: 'flex',
      backgroundColor: robotKey === 1 ? 'red' : robotKey === 2 ? 'orange' : robotKey === 3 ? 'yellow' : robotKey === 4 ? 'green' : null,
      borderRadius: 15,
    },
  }
  return (
    <div style={styles.robotStyle}>
    </div>
  )
}

export default Robot;