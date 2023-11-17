import { Container, TextField, Button, InputLabel, Box, Divider } from '@mui/material';
import { styled } from '@mui/system';
import wowBackgroundImage from '../../public/images/wowbg.jpeg';
import borderImage from '../../public/images/UI_BorderAtlas.png';
import buttonBackground from '../../public/images/buttons/button_idle.png';
import pressedButtonBackground from '../../public/images/buttons/button_pressed.png';

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

const StyledBettingContainer = styled(Box)({
  position: 'absolute',
  border: '45px solid',
  borderImage: `url(${borderImage}) 40% round`,
  zIndex: '99',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '450px',
  height: '100px',
});

const StyledBettingBackground = styled('div')({
  position: 'absolute',
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
  zIndex: '0',
  width: '500px',
  height: '150px',
  bottom: '-25%',
  right: '-6%',
});

const StyledBetButton = styled(Button)({
  fontFamily: 'sans-serif',
  fontSize: '22px',
  textAlign: 'center',
  color: '#ffc700',
  textShadow: '0 0 8px #000, 0 0 8px #000, 0 0 8px #000, 0 0 8px #000, 0 0 8px #000',

  background: `url(${buttonBackground}) no-repeat top`,
  width: '270px',
  height: '70px',
  border: 'none',
  outline: 'none',
  display: 'block',
  transform: 'scale(0.6)',
  filter: 'drop-shadow(0px 0px 8px #000)',
  zIndex: 2,
  boxShadow: 'none',
});

const StyledBetButtonPressed = styled(Button)({
  fontFamily: 'sans-serif',
  fontSize: '22px',
  textAlign: 'center',
  color: '#ffc700',
  textShadow: '0 0 8px #000, 0 0 8px #000, 0 0 8px #000, 0 0 8px #000, 0 0 8px #000',

  background: `url(${pressedButtonBackground}) no-repeat top`,
  width: '270px',
  height: '70px',
  border: 'none',
  outline: 'none',
  display: 'block',
  transform: 'scale(0.6)',
  filter: 'drop-shadow(0px 0px 8px #000)',
  zIndex: 2,
  marginTop: '-10px',
});

const StyledInputLabel = styled(InputLabel)({
  fontFamily: 'sans-serif',
  fontSize: '15px',
  textAlign: 'center',
  color: '#ffc700',
  textShadow: '0 0 8px #000, 0 0 8px #000, 0 0 8px #000, 0 0 8px #000, 0 0 8px #000',
  marginBottom: '20px',
});

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const StyledTextMessage = styled('p')({
  fontFamily: 'sans-serif',
  fontSize: '15px',
  textAlign: 'center',
  color: '#ffc700',
  textShadow: '0 0 5px #000, 0 0 8px #000, 0 0 5px #000, 0 0 8px #000, 0 0 5px #000',
  marginLeft: '10px',
});

const StyledHeader = styled('h1')({
  fontFamily: 'sans-serif',
  fontSize: '30px',
  textAlign: 'center',
  color: '#ffc700',
  textShadow: '0 0 5px #000, 0 0 8px #000, 0 0 5px #000, 0 0 8px #000, 0 0 5px #000',
  marginBottom: '25px',
});

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50%',
  width: '50%',
});

const StyledPlayerContainer = styled(StyledContainer)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50%',
  width: '25%',
  border: '45px solid',
  borderImage: `url(${borderImage}) 30% round`,
  backgroundColor: 'transparent',
  margin: 0,
  padding: 0,
  boxShadow: 'none',
});

const StyledRowContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '50%',
  width: '100%',
  borderRadius: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.70)',
  border: '45px solid',
  borderImage: `url(${borderImage}) 40% round`,
});

const StyledPlayerCard = styled(Container)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50%',
  width: '25%',
  margin: 0,
  padding: 0,
});

const StyledRollHistoryContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  alignItems: 'center',
  height: '5%',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.50)',
  filter: 'opacity(0.75)',
  border: '15px solid',
  borderImage: `url(${borderImage}) 70% round`,
});

const StyledChatContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '20%',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.50)',
  margin: 0,
  padding: 0,
  borderRadius: '10px',
  border: '45px solid',
  borderImage: `url(${borderImage}) 50% round`,
});

const StyledMessagesContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '100%',
  width: '100%',
  flex: 0.7,
  overflowX: 'hidden',
  overflowY: 'auto',
  marginLeft: '0',
  paddingLeft: '0',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
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
  justifyContent: 'start',
  alignItems: 'start',
  backgroundColor: '#101010',
  borderColor: 'orange',
  borderRadius: '5px',
  boxShadow: '0px 0px 20px 5px #3d3b3b',
  filter: 'opacity(0.8)',
});
const ChatMessage = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  padding: '8px 12px',
  margin: '4px 0',
  width: '100%',
  minWidth: '50px',
  minHeight: '50px',
  backgroundColor: 'rgba(0, 0, 0, 0.30)',
  border: '5px solid',
  borderImage: `url(${borderImage}) 40% round`,
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const MessageOwner = styled('span')({
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
  fontSize: '15px',
  textAlign: 'start',
  color: '#ffc700',
  marginRight: '8px',
});

const MessageContent = styled('p')({
  margin: 0,
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
  fontSize: '10px',
  overflow: 'auto',
  textAlign: 'start',
  color: '#ff7fff',
  flexWrap: 'wrap',
  wordWrap: 'break-word',
  marginTop: '5px',
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
  StyledBettingContainer,
  StyledBettingBackground,
  StyledBetButton,
  StyledBetButtonPressed,
  StyledTextMessage,
  StyledHeader,
};
