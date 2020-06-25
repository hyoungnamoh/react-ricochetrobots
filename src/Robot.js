import React, { useEffect, useState } from 'react';

const styles = {
  robotContainer: {
    // width: '80%',
    // height: '20px',
    // flex: 1,
    // width: '30px',
    backgroundColor: 'black',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifycontent: 'center'
  },
  robotStyle: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'black',

  }

}
const Robot = () => {
  return (
    <div style={styles.robotContainer}>
      <div style={styles.robotStyle}></div>
    </div>
  )
}

export default Robot;