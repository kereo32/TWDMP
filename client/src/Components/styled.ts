import { Container, TextField, Button, InputLabel, Box } from '@mui/material';
import { styled } from '@mui/system';
import wowBackgroundImage from '../../public/images/wowbg.jpeg';
// InputLabel, TextField, Button
const GenericContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  backgroundImage: `url(${wowBackgroundImage})`,
  backgroundSize: 'cover',
});

const StyledLoginContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50%',
  width: '50%',
  backgroundColor: 'transparent',
});

const StyledLoginTextField = styled(TextField)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'start',
  backgroundColor: '#101010',
  borderColor: 'orange',
  borderRadius: '5px',
  boxShadow: '0px 0px 20px 5px #3d3b3b',
});

const StyledLoginInputLabel = styled(InputLabel)({
  color: '#9b7c49',
  fontSize: '1.5rem',
  filter: 'brightness(2)',
});

const StyledLoginButton = styled(Button)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '50px',
  backgroundColor: '#710000',
  height: '5%',
  width: '20%',
  hover: {
    backgroundColor: '#710000',
  },
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

const StyledChatContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '20%',
  width: '100%',
  backgroundColor: '#FFF',
  margin: 0,
  padding: 0,
});

const StyledMessagesContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '100%',
  flex: 0.5,
  overflow: 'auto',
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

const StyledChatTextInput = styled(TextField)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFF',
  marginTop: '10px',
  width: '100%',
});
const ChatMessage = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  backgroundColor: '#FFFFFF',
  padding: '8px 12px',
  borderRadius: '5px',
  margin: '4px 0',
  width: '100%',
  minHeight: '50px',
});

const MessageOwner = styled('span')({
  fontWeight: 'bold',
  marginRight: '8px',
});

const MessageContent = styled('p')({
  margin: 0,
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
  StyledChatContainer,
  StyledChatTextInput,
  StyledMessagesContainer,
  ChatMessage,
  MessageOwner,
  MessageContent,
  StyledLoginContainer,
  StyledLoginTextField,
  StyledLoginInputLabel,
  StyledLoginButton,
};
