import { Container, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

const MenuContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  backgroundColor: '#493548',
});
const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50%',
  width: '50%',
  borderRadius: '10px',
  boxShadow: '0px 0px 3px 0px #6A8D92',
  backgroundColor: '#4B4E6D',
});

const StyledTextField = styled(TextField)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#4B4E6D',
});
const StyledButton = styled(Button)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#4B4E6D',
  marginTop: '10px',
});

const StyledButtonContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#4B4E6D',
  marginTop: '10px',
});

export { MenuContainer, StyledContainer, StyledTextField, StyledButton, StyledButtonContainer };
