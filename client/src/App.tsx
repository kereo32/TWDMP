import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import SocketService from './services/SocketService';
import { StoreState } from './types/index';
import { Routes, Route, Navigate } from 'react-router-dom';

import Menu from './Components/Menu';
import Connecting from './Components/Connecting';
import Game from './Components/Game';

function App() {
  const isConnected = useSelector((state: StoreState) => state.socket.connected);
  useLayoutEffect(() => {
    SocketService.connect('https://dlserver-9c002d5dab85.herokuapp.com/');

    return () => {
      SocketService.disconnect();
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={isConnected ? <Menu /> : <Connecting />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
