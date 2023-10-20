import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connectSocket, disconnectSocket } from './store/socket';

function App() {
  const dispatchConnection = useDispatch();
  useLayoutEffect(() => {
    dispatchConnection(connectSocket());

    return () => {
      dispatchConnection(disconnectSocket());
    };
  }, [dispatchConnection]);

  return (
    <>
      <div>hello</div>
    </>
  );
}

export default App;
