import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { MenuContainer } from './styled';
export default function Game() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const room = useSelector((state) => state.room);

  useEffect(() => {
    if (!user.canJoinRoom) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <MenuContainer>
        <h1>Game</h1>
        {room && <h1>{room.roomID}</h1>}
        {room.users.map((user) => (
          <h1>{user}</h1>
        ))}
      </MenuContainer>
    </>
  );
}
