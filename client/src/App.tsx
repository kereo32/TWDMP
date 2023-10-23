import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import SocketService from './services/SocketService';
import { SocketState } from './types/index';
import { Routes, Route } from 'react-router-dom';

import Menu from './Components/Menu';
import Connecting from './Components/Connecting';
import Game from './Components/Game';

function App() {
  const isConnected = useSelector((state: SocketState) => state.socket.connected);
  useLayoutEffect(() => {
    SocketService.connect('http://localhost:9000');

    return () => {
      SocketService.disconnect();
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={isConnected ? <Menu /> : <Connecting />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
