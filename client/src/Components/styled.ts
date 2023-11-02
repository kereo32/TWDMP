import { Container, TextField, Button, InputLabel } from '@mui/material';
import { styled } from '@mui/system';

const GenericContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  backgroundColor: '#493548',
});

const StyledInputLabel = styled(InputLabel)({
  backgroundColor: '#4B4E6D',
  color: '#FFFFFF',
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

const StyledPlayerContainer = styled(StyledContainer)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50%',
  width: '25%',
  boxShadow: '0px 0px 3px 0px #6A8D92',
  backgroundColor: '#4B4E6D',
  margin: 0,
  padding: 0,
});

const StyledRowContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '50%',
  width: '100%',
  borderRadius: '10px',
  boxShadow: '0px 0px 3px 0px #6A8D92',
  backgroundColor: '#4B4E6D',
});

const StyledPlayerCard = styled(Container)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50%',
  width: '25%',
  borderRadius: '10px',
  boxShadow: '0px 0px 3px 0px #6A8D92',
  backgroundColor: '#4B4E6D',
  margin: 0,
  padding: 0,
});

const StyledRollHistoryContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
  height: '5%',
  width: '100%',
  borderRadius: '5px',
  backgroundColor: '#d0d5db',
  margin: 0,
  padding: 0,
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

export {
  GenericContainer,
  StyledPlayerContainer,
  StyledInputLabel,
  StyledRowContainer,
  StyledContainer,
  StyledPlayerCard,
  StyledTextField,
  StyledButton,
  StyledButtonContainer,
  StyledRollHistoryContainer,
};
