'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import '../css/fonts.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 250, md: 400 },
  bgcolor: '#f4f2eb',
  // background: '#f4f2eb',
  border: '2px solid black',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function AfterOrderModal({
  // handleOpenOrderModal,
  handleCloseOrderModal,
  openMessage,
}) {
  return (
    <div>
      <Modal
        open={openMessage}
        onClose={handleCloseOrderModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: 'center', fontFamily: 'TTDrugsRegular' }}
          >
            Спасибо за ваше обращение!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, fontFamily: 'TTDrugsRegular' }}>
            Мы получили ваше сообщение.
            <br />
            Наш менеджер
            свяжется с вами в ближайшее время, чтобы уточнить
            детали
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
