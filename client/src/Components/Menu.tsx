import { MenuContainer, StyledContainer, StyledTextField, StyledButton, StyledButtonContainer } from './styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInformation, updateUserRoomIdByCreate, updateUserRoomIdByJoin } from '../store/user';
import { CircularProgress } from '@mui/material';
import { UserState } from '../types';

import { useNavigate } from 'react-router-dom';

export default function Menu() {
  const [player, setPlayer] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const [room, setRoom] = useState<string>('');

  const dispatch = useDispatch();
  const userName = useSelector((state: UserState) => state.user.userName);
  const canUserJoinRoom = useSelector((state: UserState) => state.user.canJoinRoom);

  useEffect(() => {
    player.length > 4 ? setButtonDisabled(false) : setButtonDisabled(true);
  }, [player]);

  useEffect(() => {
    console.log(canUserJoinRoom);
    canUserJoinRoom && navigate('/game');
  }, [canUserJoinRoom]);

  const savePlayerName = () => () => {
    dispatch(updateUserInformation({ userName: player }));
  };

  const joinRoom = () => {
    dispatch(updateUserRoomIdByJoin(room));
    setIsLoading(true);
  };
  const createRoom = () => {
    dispatch(updateUserRoomIdByCreate(room));
    setIsLoading(true);
  };

  return (
    <>
      <MenuContainer>
        {userName ? (
          isLoading ? (
            <>
              <h1>Waiting for other players</h1>
              <CircularProgress />
            </>
          ) : (
            <>
              <StyledContainer>
                <h1>{player}</h1>
                <StyledTextField
                  required
                  id="outlined-basic"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setRoom(event.target.value);
                  }}
                  label="Room"
                  variant="outlined"
                />
                <StyledButtonContainer>
                  <StyledButton onClick={joinRoom} disabled={buttonDisabled} variant="contained">
                    Join
                  </StyledButton>
                  <StyledButton onClick={createRoom} disabled={buttonDisabled} variant="contained">
                    Create
                  </StyledButton>
                </StyledButtonContainer>
              </StyledContainer>
            </>
          )
        ) : (
          <StyledContainer>
            <StyledTextField
              required
              id="outlined-basic"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPlayer(event.target.value);
              }}
              label="Player"
              variant="outlined"
            />
            <StyledButton onClick={savePlayerName()} disabled={buttonDisabled} variant="contained">
              Next
            </StyledButton>
          </StyledContainer>
        )}
      </MenuContainer>
    </>
  );
}
