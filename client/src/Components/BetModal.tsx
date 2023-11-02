import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, Dispatch, SetStateAction } from 'react';
import { InputLabel, TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import SocketService from '../services/SocketService';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
        <Box sx={style}>
          <InputLabel style={{ display: 'flex', justifyContent: 'center' }}> Place Your Bet</InputLabel>
          <TextField
            onChange={(e) => {
              handleChange(e);
            }}
            style={{ display: 'flex', justifyContent: 'center' }}
            type="number"
            id="outlined-basic"
            variant="outlined"
            value={bet}
          />

          <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              style={players[0].playerReady ? { backgroundColor: 'green', color: 'white' } : { backgroundColor: 'red' }}
              id="player1"
              disabled={players[0].name !== props.userName}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Accept
            </Button>
            <Button
              style={players[1].playerReady ? { backgroundColor: 'green', color: 'white' } : { backgroundColor: 'red' }}
              id="player2"
              disabled={players[1].name !== props.userName}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Accept
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default BetModal;
