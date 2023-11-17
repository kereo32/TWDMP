import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { resetRollHistory } from '../store/room';
import BetModal from './BetModal';
import SocketService from '../services/SocketService';
import Timer from './Timer';
import {
  GenericContainer,
  StyledPlayerContainer,
  StyledInputLabel,
  StyledButton,
  StyledRowContainer,
  StyledChatContainer,
  StyledRollHistoryContainer,
  StyledContainer,
  StyledPlayerCard,
  StyledChatTextInput,
  StyledMessagesContainer,
  ChatMessage,
  MessageContent,
  MessageOwner,
  StyledTextMessage,
  StyledHeader,
  StyledBetButton,
} from './styled';

export default function Game() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const room = useSelector((state) => state.room);
  const messages = useSelector((state) => state.room.messages);

  const { players, currentBet, gameState, rollHistory } = room;

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
      dispatch(resetRollHistory());
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

  const handleChatMessage = (e): void => {
    e.preventDefault();
    SocketService.emit('chat message', { roomID: room.roomID, userName: user.userName, message: e.currentTarget[0].value });
    e.currentTarget[0].value = '';
  };

  return user.canJoinRoom ? (
    <>
      <GenericContainer>
        <BetModal open={open} setOpen={setOpen} roomID={room.roomID} userName={user.userName} />
        <StyledRollHistoryContainer>
          {room.isRolling ? (
            <StyledTextMessage>Rolling...</StyledTextMessage>
          ) : (
            <>
              {rollHistory.map((roll, index) => {
                return (
                  <>
                    <StyledTextMessage>{roll + '      ->      '}</StyledTextMessage>
                  </>
                );
              })}
            </>
          )}
        </StyledRollHistoryContainer>
        <StyledRowContainer>
          <StyledPlayerContainer>
            {players[0].playerTurn && !room.isRolling && gameState === 'GAME_READY' ? (
              <Timer initialMinute={0} initialSeconds={15} autoRoll={handleRoll} />
            ) : (
              ''
            )}
            <StyledInputLabel style={{ fontSize: '10px' }}>{players[0].playerTurn && !room.isRolling ? 'Your Turn!' : ''}</StyledInputLabel>
            <StyledPlayerCard>
              <StyledContainer>
                <StyledHeader style={{ fontSize: '20px' }}>{players[0].name}</StyledHeader>
                <StyledHeader style={{ fontSize: '15px', marginBottom: '10px' }}>{Number(players[0].gold)}</StyledHeader>
              </StyledContainer>
            </StyledPlayerCard>
          </StyledPlayerContainer>
          {gameState === 'GAME_BET' ? (
            <StyledContainer style={{ borderRadius: '0px', boxShadow: 'none', width: '25%' }}>
              <StyledBetButton
                onClick={() => {
                  setOpen(true);
                }}
              >
                Bet
              </StyledBetButton>
            </StyledContainer>
          ) : (
            <StyledContainer style={{ borderRadius: '0px', boxShadow: 'none', width: '25%' }}>
              <StyledInputLabel>{room.isRolling ? '' : room.roll}</StyledInputLabel>
              {room.isRolling ? (
                <StyledBetButton disabled>Rolling...</StyledBetButton>
              ) : (
                <StyledBetButton
                  onClick={() => {
                    handleRoll();
                  }}
                  variant="contained"
                  disabled={user.userName !== activePlayer}
                  sx={{
                    ml: 1,
                    '&.MuiButtonBase-root:hover': {
                      bgcolor: 'transparent',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Roll
                </StyledBetButton>
              )}
            </StyledContainer>
          )}
          <StyledPlayerContainer>
            {players[1].playerTurn && !room.isRolling && gameState === 'GAME_READY' ? (
              <Timer initialMinute={0} initialSeconds={15} autoRoll={handleRoll} />
            ) : (
              ''
            )}
            <StyledInputLabel style={{ fontSize: '10px' }}>{players[1].playerTurn && !room.isRolling ? 'Your Turn!' : ''}</StyledInputLabel>
            <StyledPlayerCard>
              <StyledContainer>
                <StyledHeader style={{ fontSize: '20px' }}>{players[1].name}</StyledHeader>
                <StyledHeader style={{ fontSize: '15px', marginBottom: '10px' }}>{Number(players[1].gold)}</StyledHeader>
              </StyledContainer>
            </StyledPlayerCard>
          </StyledPlayerContainer>
          <StyledMessagesContainer>
            {messages
              .slice()
              .reverse()
              .map((message, index) => {
                return (
                  <ChatMessage key={index}>
                    <MessageOwner>{message.userName}</MessageOwner>
                    <MessageContent>{message.message}</MessageContent>
                  </ChatMessage>
                );
              })}
          </StyledMessagesContainer>
        </StyledRowContainer>

        <StyledChatContainer>
          <StyledHeader>Chat</StyledHeader>
          <form
            onSubmit={(e) => {
              handleChatMessage(e);
            }}
          >
            <StyledChatTextInput sx={{ input: { color: '#ffc700' } }} />
          </form>
        </StyledChatContainer>
      </GenericContainer>
    </>
  ) : (
    <></>
  );
}
