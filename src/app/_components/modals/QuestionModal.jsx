import * as React from 'react';
import Button from '@mui/joy/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import TextField from '@mui/material/TextField';

function MyInput({
  label, type = 'text', style, multiline = false, rows,
}) {
  return (
    <TextField
      sx={{
        width: { xs: '50vw', sm: '50vw', md: '40vw' },
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
        ...style,
      }}
      size="small"
      label={label}
      inputProps={{ type, style }}
      multiline={multiline}
      rows={rows}
    />
  );
}

export default function QuestionModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        sx={{
          background: '#2e2e27',
          marginTop: '-15px',
          color: 'white',
          border: '1px solid black',
          borderRadius: '10px',
          overflowY: 'auto',
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontFamily: 'TTDrugsRegular',
            textAlign: 'center',
          }}
        >
          Введите ваши контакты
          {' '}
          <br />
          чтобы задать вопрос
        </DialogTitle>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onClose();
          }}
        >
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Grid item>
                <MyInput label="Ваше имя ..." />
              </Grid>

              <Grid item>
                <MyInput type="tel" label="Ваш телефон ..." />
              </Grid>

              <Grid item>
                <MyInput
                  multiline
                  rows={6}
                  style={{ color: 'white', fontFamily: 'Cormorant-LightItalic' }}
                  type="text"
                  label="Ваш вопрос"
                />
              </Grid>

              {/* <Grid item>
                <MyInput label="Когда и во сколько?" />
              </Grid> */}
            </Grid>

            <Button
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
        </form>
      </ModalDialog>
    </Modal>
  );
}
