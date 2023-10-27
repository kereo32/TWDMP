import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { GenericContainer, StyledPlayerContainer, StyledInputLabel, StyledButton, StyledRowContainer, StyledContainer, StyledPlayerCard } from './styled';
export default function Game() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const room = useSelector((state) => state.room);
  const [players, setPlayers] = useState([
    { name: '', gold: 0, playerTurn: false },
    { name: '', gold: 0, playerTurn: false },
  ]);
  const [roll, setRoll] = useState(100);
  const [isRolling, setIsRolling] = useState(false);

  let bucket: number;

  useEffect(() => {
    if (!user.canJoinRoom) {
      navigate('/');
    }
    setPlayers([
      { name: room.users[0], gold: 1000, playerTurn: true },
      { name: room.users[1], gold: 1000, playerTurn: false },
    ]);
  }, [user, room]);

  const handleRoll = (e) => {
    e.preventDefault();
    if (!isRolling) {
      setIsRolling(true);
      bucket = Math.floor(Math.random() * roll);
      setRoll(bucket);
      if (players[0].playerTurn) {
        setPlayers([
          { ...players[0], playerTurn: false },
          { ...players[1], playerTurn: true },
        ]);
      } else {
        setPlayers([
          { ...players[0], playerTurn: true },
          { ...players[1], playerTurn: false },
        ]);
      }

      setTimeout(() => {
        setIsRolling(false);
      }, 2000);
    }
  };

  return (
    <>
      <GenericContainer>
        <StyledRowContainer>
          <StyledPlayerContainer>
            <StyledInputLabel>{players[0].playerTurn && !isRolling ? 'Your Turn!' : ''}</StyledInputLabel>
            <StyledPlayerCard style={{ borderRadius: '0px', boxShadow: 'none', width: '100%' }}>
              <StyledContainer style={{ borderRadius: '0px', boxShadow: 'none' }}>
                <h1>{players[0].name}</h1>
                <h2>{players[0].gold}</h2>
              </StyledContainer>
            </StyledPlayerCard>
          </StyledPlayerContainer>
          <StyledContainer style={{ borderRadius: '0px', boxShadow: 'none', width: '25%' }}>
            <StyledInputLabel>{isRolling ? '' : roll}</StyledInputLabel>
            {isRolling ? (
              <StyledButton disabled>Rolling...</StyledButton>
            ) : (
              <StyledButton
                onClick={(e) => {
                  handleRoll(e);
                }}
                variant="contained"
                color="primary"
              >
                Roll
              </StyledButton>
            )}
          </StyledContainer>
          <StyledPlayerContainer>
            <StyledInputLabel>{players[1].playerTurn && !isRolling ? 'Your Turn!' : ''}</StyledInputLabel>
            <StyledPlayerCard style={{ borderRadius: '0px', boxShadow: 'none', width: '100%' }}>
              <StyledContainer style={{ borderRadius: '0px', boxShadow: 'none', width: '100%' }}>
                <h1>{players[1].name}</h1>
                <h2>{players[1].gold}</h2>
              </StyledContainer>
            </StyledPlayerCard>
          </StyledPlayerContainer>
        </StyledRowContainer>
      </GenericContainer>
    </>
  );
}
