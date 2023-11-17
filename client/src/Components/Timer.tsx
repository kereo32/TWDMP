import React from 'react';
import { useState, useEffect } from 'react';

import { MessageOwner } from './styled';

const Timer = (props: any) => {
  const { initialMinute = 0, initialSeconds = 0, autoRoll } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          autoRoll();
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      {minutes === 0 && seconds === 0 ? null : (
        <MessageOwner style={{ fontSize: '10px', marginRight: '-3px' }}>
          {' '}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </MessageOwner>
      )}
    </div>
  );
};

export default Timer;
