import * as React from 'react';
// import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function DataProcessing() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {/* <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}> */}
      <Typography
        component="h4"
        id="modal-title"
        level="h4"
        textColor="inherit"
        onClick={() => setOpen(true)}
        sx={{
          fontSize: '10px',
          fontWeight: 400,
          fontFamily: 'TTDrugsRegular',
        }}
      >
        Нажимая на кнопку я принимаю
        {' '}
        <span style={{ color: 'blue', cursor: 'pointer', fontFamily: 'TTDrugsRegular' }}>условия обработки данных</span>
      </Typography>
      {/* </Button> */}

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            m: 1,
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
            sx={{
              fontFamily: 'TTDrugsRegular',
            }}
          >
            Согласие на обработку данных
          </Typography>
          <Typography
            id="modal-desc"
            textColor="text.tertiary"
            sx={{
              fontFamily: 'TTDrugsRegular',
            }}
          >
            Я согласен на обработку указанных данных
            ООО «Мирагриль» в целях оформления моего заказа и
            обратной связи и на обработку им сведений
            обо мне, как о потенциальном клиенте, для
            формирования индивидуального предложения по заявке
          </Typography>
        </Sheet>
      </Modal>
    </>
  );
}
