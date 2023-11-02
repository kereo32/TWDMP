import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import BetModal from './BetModal';
import SocketService from '../services/SocketService';
import Timer from './Timer';
import { GenericContainer, StyledPlayerContainer, StyledInputLabel, StyledButton, StyledRowContainer, StyledContainer, StyledPlayerCard } from './styled';
export default function Game() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const room = useSelector((state) => state.room);

  const { players, currentBet, gameState } = room;

  const [open, setOpen] = useState(true);
  const [activePlayer, setActivePlayer] = useState('');

  let bucket: number;

  useEffect(() => {
    players.forEach((player) => {
      if (player.playerTurn) {
        setActivePlayer(player.name);
      }
    });
  }, [players]);

  useEffect(() => {
    if (!user.canJoinRoom) {
      navigate('/');
    }
  }, [user, room]);

  useEffect(() => {
    if (gameState === 'GAME_READY') {
      SocketService.emit('updateRoll', { roomID: room.roomID, roll: currentBet });
      SocketService.emit('updatePlayerTurn', { roomID: room.roomID, playerIndex: 0, playerTurn: true });
      setOpen(false);
    } else if (gameState === 'GAME_BET') {
      setOpen(true);
    }
  }, [gameState]);

  const handleRoll = () => {
    if (!room.isRolling) {
      SocketService.emit('updateRollingState', { roomID: room.roomID, isRolling: true });
      bucket = Math.floor(Math.random() * room.roll);
      bucket == 0 && bucket++;

      SocketService.emit('updateRoll', { roomID: room.roomID, roll: bucket });

      if (players[0].playerTurn) {
        SocketService.emit('updatePlayerTurn', { roomID: room.roomID, playerIndex: 0, playerTurn: false });
        SocketService.emit('updatePlayerTurn', { roomID: room.roomID, playerIndex: 1, playerTurn: true });
      } else {
        SocketService.emit('updatePlayerTurn', { roomID: room.roomID, playerIndex: 0, playerTurn: true });
        SocketService.emit('updatePlayerTurn', { roomID: room.roomID, playerIndex: 1, playerTurn: false });
      }

      setTimeout(() => {
        SocketService.emit('updateRollingState', { roomID: room.roomID, isRolling: false });
        if (bucket === 1) {
          isGameOver();
        }
      }, 2000);
    }
  };

  const isGameOver = (): void => {
    if (players[0].playerTurn) {
      SocketService.emit('updatePlayerGold', { roomID: room.roomID, playerIndex: 1, goldChange: currentBet });
    } else if (players[1].playerTurn) {
      SocketService.emit('updatePlayerGold', { roomID: room.roomID, playerIndex: 0, goldChange: currentBet });
    }

    SocketService.emit('updatePlayerReadyStatus', { roomID: room.roomID, playerIndex: 0, playerReady: false });
    SocketService.emit('updatePlayerReadyStatus', { roomID: room.roomID, playerIndex: 1, playerReady: false });

    SocketService.emit('updatePlayerTurn', { roomID: room.roomID, playerIndex: 0, playerTurn: false });
    SocketService.emit('updatePlayerTurn', { roomID: room.roomID, playerIndex: 1, playerTurn: false });

    SocketService.emit('updateRollingState', { roomID: room.roomID, isRolling: false });

    SocketService.emit('updateGameState', { roomID: room.roomID, gameState: 'GAME_BET' });
  };

  return (
    <>
      <GenericContainer>
        <BetModal open={open} setOpen={setOpen} roomID={room.roomID} userName={user.userName} />
        <StyledRowContainer>
          <StyledPlayerContainer>
            {players[0].playerTurn && !room.isRolling && gameState === 'GAME_READY' ? (
              <Timer initialMinute={0} initialSeconds={15} autoRoll={handleRoll} />
            ) : (
              ''
            )}
            <StyledInputLabel>{players[0].playerTurn && !room.isRolling ? 'Your Turn!' : ''}</StyledInputLabel>
            <StyledPlayerCard style={{ borderRadius: '0px', boxShadow: 'none', width: '100%' }}>
              <StyledContainer style={{ borderRadius: '0px', boxShadow: 'none' }}>
                <h1>{players[0].name}</h1>
                <h2>{Number(players[0].gold)}</h2>
              </StyledContainer>
            </StyledPlayerCard>
          </StyledPlayerContainer>
          {gameState === 'GAME_BET' ? (
            <StyledContainer style={{ borderRadius: '0px', boxShadow: 'none', width: '25%' }}>
              <StyledButton
                onClick={() => {
                  setOpen(true);
                }}
              >
                Bet
              </StyledButton>
            </StyledContainer>
          ) : (
            <StyledContainer style={{ borderRadius: '0px', boxShadow: 'none', width: '25%' }}>
              <StyledInputLabel>{room.isRolling ? '' : room.roll}</StyledInputLabel>
              {room.isRolling ? (
                <StyledButton disabled>Rolling...</StyledButton>
              ) : (
                <StyledButton
                  onClick={() => {
                    handleRoll();
                  }}
                  variant="contained"
                  color="primary"
                  disabled={user.userName !== activePlayer}
                >
                  Roll
                </StyledButton>
              )}
            </StyledContainer>
          )}
          <StyledPlayerContainer>
            {players[1].playerTurn && !room.isRolling && gameState === 'GAME_READY' ? (
              <Timer initialMinute={0} initialSeconds={15} autoRoll={handleRoll} />
            ) : (
              ''
            )}
            <StyledInputLabel>{players[1].playerTurn && !room.isRolling ? 'Your Turn!' : ''}</StyledInputLabel>
            <StyledPlayerCard style={{ borderRadius: '0px', boxShadow: 'none', width: '100%' }}>
              <StyledContainer style={{ borderRadius: '0px', boxShadow: 'none', width: '100%' }}>
                <h1>{players[1].name}</h1>
                <h2>{Number(players[1].gold)}</h2>
              </StyledContainer>
            </StyledPlayerCard>
          </StyledPlayerContainer>
        </StyledRowContainer>
      </GenericContainer>
    </>
  );
}
