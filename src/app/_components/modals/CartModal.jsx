import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Grid from '@mui/material/Grid';
import DataProcessing from './DataProcessing';
// import Add from '@mui/icons-material/Add';

export default function CartModal({ allPrice }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {/* <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        New project
      </Button> */}
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{
          fontFamily: 'TTDrugs-Bold',
          fontSize: '11px',
          color: '#3c3b34',
          width: '130px',
          height: '32px',
          borderRadius: '50%',
          border: '0.1px solid #3c3b34',
          mb: '10px',
          // mt: '10%',
          '&:hover': {
            color: '#ffffff', // Цвет текста при наведении
            backgroundColor: '#3c3b34', // Пример изменения фона при наведении
            border: '0.1px solid #3c3b34',
          },
        }}
      >
        ЗАКАЗАТЬ
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <ModalDialog
          sx={{
            background: '#f4f2eb',
            border: '2px solid #3c3b34',
            maxHeight: '80vh',
            // overflow: 'hidden',
            overflowY: 'auto',
          }}
        >

          <DialogTitle sx={{
            fontFamily: 'TTDrugs-Bold',
          }}
          >
            Оформить заказ
          </DialogTitle>

          <DialogContent sx={{
            fontFamily: 'TTDrugs-Bold',
          }}
          >
            на сумму
            {' '}
            {allPrice}
            {' '}
            ₽
          </DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel
                  sx={{
                    fontFamily: 'TTDrugs-Bold',
                  }}
                >
                  Ваше имя
                </FormLabel>
                <Input
                  autoFocus
                  required
                  sx={{
                    background: '#f4f2eb',
                    border: '0.1px solid #3c3b34',
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  sx={{
                    fontFamily: 'TTDrugs-Bold',
                  }}
                >
                  Ваш телефон
                </FormLabel>
                <Input
                  required
                  sx={{
                    background: '#f4f2eb',
                    border: '0.1px solid #3c3b34',
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  sx={{
                    fontFamily: 'TTDrugs-Bold',
                  }}
                >
                  Ваша почта
                </FormLabel>
                <Input
                  required
                  sx={{
                    background: '#f4f2eb',
                    border: '0.1px solid #3c3b34',
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  sx={{
                    fontFamily: 'TTDrugs-Bold',
                  }}
                >
                  Адрес доставки
                </FormLabel>
                <Input
                  required
                  sx={{
                    background: '#f4f2eb',
                    border: '0.1px solid #3c3b34',
                  }}
                />
              </FormControl>

              <Grid
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    fontFamily: 'TTDrugs-Bold',
                    fontSize: '11px',
                    color: '#3c3b34',
                    width: '130px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '0.1px solid #3c3b34',
                    mb: '10px',
                    // mt: '10%',
                    '&:hover': {
                      color: '#ffffff', // Цвет текста при наведении
                      backgroundColor: '#3c3b34', // Пример изменения фона при наведении
                      border: '0.1px solid #3c3b34',
                    },
                  }}
                >
                  ОТПРАВИТЬ
                </Button>
              </Grid>
            </Stack>
            <DataProcessing />
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}
