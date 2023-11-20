import { GenericContainer, StyledLoginButton, StyledLoginTextField, StyledLoginInputLabel, StyledLoginContainer } from './styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateErrorMessage, updateUserInformation, updateUserRoomId } from '../store/user';
import { CircularProgress } from '@mui/material';
import { StoreState } from '../types';

import { useNavigate } from 'react-router-dom';

export default function Menu() {
  const [player, setPlayer] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [room, setRoom] = useState<string>('');

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userName = useSelector((state: StoreState) => state.user.userName);
  const canUserJoinRoom = useSelector((state: StoreState) => state.user.canJoinRoom);
  const user = useSelector((state: StoreState) => state.user);

  useEffect(() => {
    player.length > 4 ? setButtonDisabled(false) : setButtonDisabled(true);
  }, [player]);

  useEffect(() => {
    canUserJoinRoom && navigate('/game');
  }, [user, canUserJoinRoom]);

  const savePlayerName = () => () => {
    dispatch(updateUserInformation({ ...user, userName: player }));
  };

  const joinRoomOrCreateRoom = () => {
    if (!user.errorMessage) {
      dispatch(updateUserRoomId(room));
      setIsLoading(true);
    } else {
      dispatch(updateErrorMessage(''));
      dispatch(updateUserRoomId(room));
    }
  };

  return (
    <>
      <GenericContainer>
        {userName ? (
          isLoading && !user.errorMessage ? (
            <>
              <h1>Waiting for other players</h1>
              <CircularProgress />
            </>
          ) : (
            <>
              <StyledLoginContainer>
                <h1>{'Welcome ' + player + '!'}</h1>
                <StyledLoginInputLabel htmlFor="outlined-basic">Room ID</StyledLoginInputLabel>
                <StyledLoginTextField
                  required
                  id="outlined-basic"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setRoom(event.target.value);
                  }}
                  size="small"
                  sx={{
                    '& fieldset': { border: 'none' },
                    input: { color: 'white' },
                    width: '30%',
                  }}
                />
                <StyledLoginButton
                  onClick={joinRoomOrCreateRoom}
                  sx={{
                    ml: 1,
                    '&.MuiButtonBase-root:hover': {
                      bgcolor: '#6c0000',
                    },
                  }}
                  disabled={buttonDisabled}
                  variant="contained"
                >
                  Join
                </StyledLoginButton>
                <p>{user.errorMessage}</p>
              </StyledLoginContainer>
            </>
          )
        ) : (
          <StyledLoginContainer>
            <StyledLoginInputLabel htmlFor="outlined-basic">Username</StyledLoginInputLabel>
            <StyledLoginTextField
              required
              id="outlined-basic"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPlayer(event.target.value);
              }}
              size="small"
              sx={{
                '& fieldset': { border: 'none' },
                input: { color: 'white' },
                width: '30%',
              }}
            />
            <StyledLoginButton
              onClick={savePlayerName()}
              sx={{
                ml: 1,
                '&.MuiButtonBase-root:hover': {
                  bgcolor: '#6c0000',
                },
              }}
              disabled={buttonDisabled}
              variant="contained"
            >
              Next
            </StyledLoginButton>
          </StyledLoginContainer>
        )}
      </GenericContainer>
    </>
  );
}
