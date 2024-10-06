'use client';

import { useRef, useState, useEffect } from 'react';
import { useUnit } from 'effector-react';

import axios from 'axios';
import emailjs from '@emailjs/browser';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MaskedInput from 'react-text-mask';

import AfterOrderModal from '../modals/AfterOrderModal';

import {
  fetchContactsFx, contactsStore,
} from '../store/singleTypesStore';

function MyInput({
  label, type = 'text', value, onChange, name,
}) {
  // if (name === 'phone') {
  //   return (
  //     <MaskedInput
  //       mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
  //       value={value}
  //       onChange={(e) => onChange({ target: { name, value: e.target.value } })} // Обновляем состояние корректно
  //       render={(ref, props) => (
  //         <TextField
  //           inputRef={ref}
  //           {...props}
  //           label={label}
  //           sx={{
  //             width: { xs: '50vw', sm: '50vw', md: '25vw' },
  //             '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
  //               paddingTop: '8.5px',
  //               paddingBottom: '8.5px',
  //               lineHeight: '0px',
  //               // marginBottom: '8.5px',
  //               // verticalAlign: 'center',
  //             },
  //             '& label': {
  //               fontFamily: 'Cormorant-LightItalic',
  //               color: 'white',
  //               verticalAlign: 'baseline',
  //             },
  //             '& label.Mui-focused': { color: 'white' },
  //             '& .MuiOutlinedInput-root': {
  //               '& fieldset': { borderColor: 'white' },
  //               '&:hover fieldset': { borderColor: 'white' },
  //               '&.Mui-focused fieldset': { borderColor: 'white' },
  //               '& input': { fontFamily: 'Cormorant-LightItalic', color: 'white' },
  //               '& input:-webkit-autofill': {
  //                 WebkitBoxShadow: '0 0 0 1000px #2e2e27 inset',
  //                 fontFamily: 'Cormorant-LightItalic',
  //                 WebkitTextFillColor: 'white',
  //               },
  //               '& input:-webkit-autofill:focus': {
  //                 WebkitBoxShadow: '0 0 0 1000px #2e2e27 inset',
  //                 fontFamily: 'Cormorant-LightItalic',
  //                 WebkitTextFillColor: 'white',
  //               },
  //             },
  //           }}
  //         />
  //       )}
  //     />
  //   );
  // }
  return (
    <TextField
      sx={{
        width: { xs: '50vw', sm: '50vw', md: '25vw' },
        '& label': {
          fontFamily: 'Cormorant-LightItalic',
          color: 'white', // Цвет текста метки
        },
        '& label.Mui-focused': {
          color: 'white', // Цвет текста метки при фокусе
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'white', // Цвет линии подчеркивания при фокусе
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white', // Цвет границы
          },
          '&:hover fieldset': {
            borderColor: 'white', // Цвет границы при наведении
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white', // Цвет границы при фокусе
          },
          '& input': {
            fontFamily: 'Cormorant-LightItalic',
            color: 'white', // Устанавливает цвет текста для ввода
          },
        },
      }}
      size="small"
      label={label}
      value={value}
      onChange={onChange}
      name={name}
      inputProps={{ type }} // Устанавливаем тип через inputProps для элемента input
    />
  );
}

export default function Zabronirovat() {
  const contactsData = useUnit(contactsStore);

  // const [isLoading, setIsLoading] = React.useState(true);

  const [contacts, setContacts] = useState({
    botToken: '6296545496:AAHVoTaVuam_Y9DwWefv-1FfXDRcOLBZRus',
    chatId: '-1001801746808',
    emailJSservice: 'service_tqau08j',
    emailJStemplate: 'template_8x0hgzz',
    emailJSpublicKey: 'wN156RBAwtJ6HfdQ5',
  });

  useEffect(() => {
    fetchContactsFx();
  }, []);

  useEffect(() => {
    if (contactsData && contactsData.attributes) {
      setContacts({
        botToken: contactsData.attributes.telegramBotToken,
        chatId: contactsData.attributes.telegramChatId,
        emailJSservice: contactsData.attributes.emailJSservice,
        emailJStemplate: contactsData.attributes.emailJStemplate,
        emailJSpublicKey: contactsData.attributes.emailJSpublicKey,
      });
    }
    // console.log(contacts);
  }, [contactsData]);
  // данные бота MiraGrillBot и чата MiraGrillOrders для отправки в телегу
  // const botToken = '6296545496:AAHVoTaVuam_Y9DwWefv-1FfXDRcOLBZRus';
  // const chatId = '-1001801746808';
  // инпуты для заказов
  const [input, setInput] = useState({
    form: 'Бронь с главной страницы',
    clientname: '',
    phone: '',
    personsQuality: '1',
    datetime: '',
    question: '',
  });

  // ручка чтобы менять значение формы
  const changeInputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // константа для заказа
  const order = {
    form: input.form,
    name: input.clientname,
    phone: input.phone,
    guests: input.personsQuality,
    datetime: input.datetime,
    question: input.question,
  };

  // переменная для заказов в телеграм
  const orderTelegram = `У вас новый заказ из формы ${input.form}! Имя: ${input.clientname} Телефон: ${input.phone} Количество персон: ${input.personsQuality} Когда придут: ${input.datetime} Вопрос: ${input.question} `;
  //   const [open, setOpen] = React.useState(false);

  // ручка отправки и сброса формы
  const handleSendMessage = () => {
    axios.post(`https://api.telegram.org/bot${contacts.botToken}/sendMessage?chat_id=${contacts.chatId}&parse_mode=html&text=${JSON.stringify(orderTelegram)}`, orderTelegram)
      .then((res) => console.log(res.data, '===это res==='));

    // отправка на мыло
    emailjs.send(`${contacts.emailJSservice}`, `${contacts.emailJStemplate}`, order, `${contacts.emailJSpublicKey}`)
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    // console.log(order);

    setInput({
      form: input.form,
      clientname: '',
      phone: '',
      personsQuality: '1',
      datetime: '',
      question: '',
    });
  };

  // состояние и ручка для модалки после отправки заказа
  const [openMessage, setOpenMessage] = useState(false);
  const handleOpenOrderModal = () => {
    setOpenMessage(true);
    setTimeout(() => {
      setOpenMessage(false);
      // onClose();
    }, 3500);
  };
  const handleCloseOrderModal = () => {
    setOpenMessage(true);
  };

  return (
    <Box
      id="zabronirovat-stol"
      sx={{
        background: '#2e2e27',
        marginTop: '-15px',
        color: 'white',
        border: '1px solid black',
        borderRadius: '10px',
        position: 'relative',
        zIndex: 99,
        overflow: 'hidden',
        paddingBottom: '5%',
      }}
    >
      <Grid sx={{
        border: '1px solid white',
        width: '90vw',
        height: '90vw',
        borderRadius: '50%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        display: { xs: 'none', sm: 'none', md: 'flex' },
      }}
      />
      <Grid sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '5%',
      }}
      >
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            fontFamily: 'TTDrugsRegular',
            fontSize: {
              md: 'calc(8px + (15 - 8) * ((100vw - 300px) / (1200 - 300)))',
              xs: 'calc(8px + (21 - 8) * ((100vw - 300px) / (1200 - 300)))',
            },
            mt: '20px',
          }}
        >
          ЗАБРОНИРОВАТЬ СТОЛ
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            fontFamily: 'Cormorant-Medium',
            fontSize: '10vw',
            mt: '20px',
            mb: 0,
            textAlign: 'center',
            lineHeight: '1.2em',
          }}
        >
          КОГДА ВАС
          {' '}
          <br />
          ЖДАТЬ?
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Cormorant-LightItalic',
            color: 'white',
            fontSize: 'calc(13px + (30 - 13) * ((100vw - 300px) / (1200 - 300)))',
            mt: '20px',
            mb: '40px',
            lineHeight: '100%',
          }}
          variant="h2"
          component="h2"
          gutterBottom
        >
          заполните форму чтобы забронировать стол
        </Typography>

      </Grid>

      <Grid
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >

        <Grid
          spacing={2}
          container
          sx={{
            width: '60%',
            display: 'flex',
            // flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid item>
            <MyInput
              onChange={changeInputHandler}
              value={input.clientname}
              name="clientname"
              label="Ваше имя ..."
            />
          </Grid>

          <Grid item>
            <MyInput
              type="tel"
              label="Ваш телефон ..."
              name="phone"
              onChange={changeInputHandler}
              value={input.phone}
            />
          </Grid>

          <Grid item>
            <MyInput
              label="Сколько гостей?"
              onChange={changeInputHandler}
              value={input.personsQuality}
              type="number"
              name="personsQuality"
            />
          </Grid>

          <Grid item>
            <MyInput
              onChange={changeInputHandler}
              value={input.datetime}
              type="datetime-local"
              // type="text"
              name="datetime"
              // label="Когда и во сколько?"
            />
            {/* <MyInput type="datetime-local" label="Когда планируете зайти?" /> */}
          </Grid>
        </Grid>

        <Button
          onClick={() => {
            handleOpenOrderModal();
            handleSendMessage();
          }}
          variant="outlined"
          sx={{
            fontFamily: 'TTDrugs-Bold',
            fontSize: {
              md: '9px',
              xs: '9px',
            },
            color: 'white',
            width: '150px',
            height: '32px',
            borderRadius: '50%',
            border: '0.1px solid white',
            // mt: '10%',
            margin: 0,
            mt: '5%',
            '&:hover': {
              color: '#2e2e27',
              backgroundColor: 'white',
              border: '0.1px solid #3c3b34',
            },
          }}
        >
          ОТПРАВИТЬ
        </Button>

      </Grid>
      <AfterOrderModal
        handleOpenOrderModal={handleOpenOrderModal}
        openMessage={openMessage}
      />
    </Box>
  );
}
