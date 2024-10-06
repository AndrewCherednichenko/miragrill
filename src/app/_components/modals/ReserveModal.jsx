import * as React from 'react';
import { useUnit } from 'effector-react';
import Button from '@mui/joy/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MaskedInput from 'react-text-mask';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import axios from 'axios';
import emailjs from '@emailjs/browser';

import AfterOrderModal from './AfterOrderModal';

import {
  fetchContactsFx, contactsStore,
} from '../store/singleTypesStore';

function MyInput({
  label, name, value, onChange, type = 'text',
}) {
  if (name === 'phone') {
    return (
      <MaskedInput
        mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
        value={value}
        onChange={(e) => onChange({ target: { name, value: e.target.value } })} // Обновляем состояние корректно
        render={(ref, props) => (
          <TextField
            inputRef={ref}
            {...props}
            label={label}
            sx={{
              width: { xs: '50vw', sm: '50vw', md: '40vw' },
              '& label': { fontFamily: 'Cormorant-LightItalic', color: 'white' },
              '& label.Mui-focused': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
                '& input': { fontFamily: 'Cormorant-LightItalic', color: 'white' },
                '& input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 1000px #2e2e27 inset',
                  fontFamily: 'Cormorant-LightItalic',
                  WebkitTextFillColor: 'white',
                },
                '& input:-webkit-autofill:focus': {
                  WebkitBoxShadow: '0 0 0 1000px #2e2e27 inset',
                  fontFamily: 'Cormorant-LightItalic',
                  WebkitTextFillColor: 'white',
                },
              },
            }}
          />
        )}
      />
    );
  }

  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange} // Стандартный обработчик для полей без маски
      name={name}
      type={type} // Передаем тип поля, например, "datetime-local"
      sx={{
        width: { xs: '50vw', sm: '50vw', md: '40vw' },
        '& label': { fontFamily: 'Cormorant-LightItalic', color: 'white' },
        '& label.Mui-focused': { color: 'white' },
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: 'white' },
          '&:hover fieldset': { borderColor: 'white' },
          '&.Mui-focused fieldset': { borderColor: 'white' },
          '& input': { fontFamily: 'Cormorant-LightItalic', color: 'white' },
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px #2e2e27 inset',
            fontFamily: 'Cormorant-LightItalic',
            WebkitTextFillColor: 'white',
          },
          '& input:-webkit-autofill:focus': {
            WebkitBoxShadow: '0 0 0 1000px #2e2e27 inset',
            fontFamily: 'Cormorant-LightItalic',
            WebkitTextFillColor: 'white',
          },
        },
      }}
    />
  );
}

export default function ReserveModal({ open, onClose, title }) {
  const contactsData = useUnit(contactsStore);

  // const [isLoading, setIsLoading] = React.useState(true);

  const [contacts, setContacts] = React.useState({
    botToken: '6296545496:AAHVoTaVuam_Y9DwWefv-1FfXDRcOLBZRus',
    chatId: '-1001801746808',
    emailJSservice: 'service_tqau08j',
    emailJStemplate: 'template_8x0hgzz',
    emailJSpublicKey: 'wN156RBAwtJ6HfdQ5',
  });

  React.useEffect(() => {
    fetchContactsFx();
  }, []);

  React.useEffect(() => {
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
  const [input, setInput] = React.useState({
    form: title,
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
  const [openMessage, setOpenMessage] = React.useState(false);
  const handleOpenOrderModal = () => {
    setOpenMessage(true);
    onClose();
    setTimeout(() => {
      setOpenMessage(false);
      // onClose();
    }, 3500);
  };
  const handleCloseOrderModal = () => {
    setOpenMessage(true);
    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <ModalDialog
          sx={{
            background: '#2e2e27',
            marginTop: '-15px',
            color: 'white',
            border: '1px solid black',
            borderRadius: '10px',
            // overflow: 'hidden',
            overflowY: 'auto',
          }}
        >
          <DialogTitle
            sx={{
            //   width: '100%',
              display: 'flex',
              justifyContent: 'center',
              fontFamily: 'TTDrugsRegular',
              textAlign: 'center',
            }}
          >
            Заполните форму
            {' '}
            <br />
            чтобы
            {' '}
            {title}
          </DialogTitle>

          <div>
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
                // width: '60%',
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
                    name="phone"
                    onChange={changeInputHandler}
                    value={input.phone}
                    type="tel"
                    label="Ваш телефон ..."
                  />
                </Grid>

                <Grid item>
                  <MyInput
                    onChange={changeInputHandler}
                    value={input.personsQuality}
                    type="number"
                    name="personsQuality"
                    label="Сколько гостей?"
                  />
                </Grid>

                <Grid item>
                  <MyInput
                    onChange={changeInputHandler}
                    value={input.datetime}
                    type="text"
                    name="datetime"
                    label="Когда и во сколько?"
                  />
                </Grid>
              </Grid>

              <Button
                onClick={() => {
                // event.preventDefault();
                  handleOpenOrderModal();
                  handleSendMessage();
                // onClose();
                }}
                variant="outlined"
                type="submit"
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
          </div>

        </ModalDialog>
      </Modal>

      <AfterOrderModal
        handleOpenOrderModal={handleOpenOrderModal}
        openMessage={openMessage}
      />
    </>
  );
}
