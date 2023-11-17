import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, Dispatch, SetStateAction } from 'react';
import { InputLabel, TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import { StyledBettingContainer, StyledBettingBackground, StyledBetButton, StyledBetButtonPressed, StyledInputLabel, StyledLoginTextField } from './styled';

import SocketService from '../services/SocketService';

type BetModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  roomID: string;
  userName: string;
};

function BetModal(props: BetModalProps) {
  const bet = useSelector((state) => state.room.currentBet);
  const players = useSelector((state) => state.room.players);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    SocketService.emit('updatePlayerReadyStatus', { roomID: props.roomID, playerIndex: e.currentTarget.id === 'player1' ? 0 : 1, playerReady: true });
  };

  const handleChange = (e: InputEvent) => {
    e.preventDefault();
    SocketService.emit('updatePlayerReadyStatus', { roomID: props.roomID, playerIndex: 0, playerReady: false });
    SocketService.emit('updatePlayerReadyStatus', { roomID: props.roomID, playerIndex: 1, playerReady: false });
    SocketService.emit('updateCurrentBet', { roomID: props.roomID, currentBet: parseInt(e.target.value) });
  };
  useEffect(() => {
    if (players[0].playerReady && players[1].playerReady) {
      SocketService.emit('updateGameState', { roomID: props.roomID, gameState: 'GAME_READY' });
      SocketService.emit('updatePlayerTurn', { roomID: props.roomID, playerIndex: Math.round(Math.random()), playerTurn: false });
      props.setOpen(false);
    }
  }, [players[0].playerReady, players[1].playerReady]);

  return (
    <div>
      <Modal open={props.open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <StyledBettingContainer style={{ height: '15%' }}>
          <StyledBettingBackground />
          <StyledInputLabel> Place Your Bet</StyledInputLabel>
          <TextField
            onChange={(e) => {
              handleChange(e);
            }}
            style={{ display: 'flex', justifyContent: 'center' }}
            sx={{
              input: { color: '#ffc700' },
              '& fieldset': { borderColor: '#ffc700' },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#ffc700',
                },
              },
            }}
            type="number"
            id="outlined-basic"
            value={bet}
          />

          <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            {players[0].playerReady ? (
              <StyledBetButtonPressed
                disableRipple
                id="player1"
                disabled={players[0].name !== props.userName}
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Accept
              </StyledBetButtonPressed>
            ) : (
              <StyledBetButton
                disableRipple
                id="player1"
                disabled={players[0].name !== props.userName}
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Accept
              </StyledBetButton>
            )}
            {players[1].playerReady ? (
              <StyledBetButtonPressed
                id="player2"
                disableRipple
                disabled={players[1].name !== props.userName}
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Accept
              </StyledBetButtonPressed>
            ) : (
              <StyledBetButton
                id="player2"
                disableRipple
                disabled={players[1].name !== props.userName}
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Accept
              </StyledBetButton>
            )}
          </Box>
        </StyledBettingContainer>
      </Modal>
    </div>
  );
}

export default BetModal;
