import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';

export default function CountDownTimer() {
  const [timer, setTimer] = useState(3600);
  const history = useHistory();
  useEffect(() => {
    var interval = null;
    interval = setInterval(() => {
      localStorage.setItem('time', timer - 1);
      setTimer((prevState) => prevState - 1);
    }, 1000);
    if (timer === 0) {
      clearInterval(interval);
      history.push('/');
    }
    return () => {
      clearInterval(interval);
    };
  }, [timer, history]);

  return (
    <Typography style={{ color: '#ec1e20' }}>
      Hiệu lực thanh toán trong vòng:{' '}
      {`0${Math.floor(localStorage.getItem('time') / (60 * 60))}`.slice(-2)}:
      {`0${Math.floor((localStorage.getItem('time') / 60) % 60)}`.slice(-2)}:
      {`0${Math.floor(localStorage.getItem('time') % 60)}`.slice(-2)}
    </Typography>
  );
}
