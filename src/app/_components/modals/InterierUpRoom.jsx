'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '80%',
  bgcolor: '#f4f2eb',
  border: '3px solid #3c3b34',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function InterierUpRoom() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{
          fontFamily: 'TTDrugs-Bold',
          fontSize: {
            md: '9px',
            xs: '9px',
          },
          color: '#3c3b34',
          width: '130px',
          height: '32px',
          borderRadius: '50%',
          border: '0.1px solid #3c3b34',
          mt: '10%',
          '&:hover': {
            color: '#ffffff', // Цвет текста при наведении
            backgroundColor: '#3c3b34', // Пример изменения фона при наведении
            border: '0.1px solid #3c3b34',
          },
        }}
      >
        ПОСМОТРЕТЬ
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Кнопка закрытия в верхнем левом углу */}
          <Button
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 2, // Регулируйте положение по вашему вкусу
              right: -8,
              color: 'gray', // Цвет иконки
            }}
          >
            <CloseIcon />
            {' '}
          </Button>
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <a
              href="https://yandex.ru/maps/org/miragrill/133134107506/?utm_medium=mapframe&utm_source=maps"
              style={{
                color: '#eee', fontSize: '12px', position: 'absolute', top: '0px',
              }}
            >
              MiraGrill
            </a>
            <a
              href="https://yandex.ru/maps/213/moscow/category/restaurant/184106394/?utm_medium=mapframe&utm_source=maps"
              style={{
                color: '#eee', fontSize: '12px', position: 'absolute', top: '14px',
              }}
            >
              Ресторан в Москве
            </a>
            <a
              href="https://yandex.ru/maps/213/moscow/category/banquet_hall/184108315/?utm_medium=mapframe&utm_source=maps"
              style={{
                color: '#eee', fontSize: '12px', position: 'absolute', top: '28px',
              }}
            >
              Банкетный зал в Москве
            </a>
            <iframe
              title="Мирагриль - верхний зал"
              src="https://yandex.ru/map-widget/v1/?display-text=%D0%BC%D0%B8%D1%80%D0%B0%20%D0%B3%D1%80%D0%B8%D0%BB%D1%8C&filter=alternate_vertical%3ARequestWindow&ll=37.635999%2C55.814995&mode=search&oid=133134107506&ol=biz&panorama%5Bdirection%5D=166.297505%2C-5.595938&panorama%5Bfull%5D=true&panorama%5Bpoint%5D=37.639643%2C55.816039&panorama%5Bspan%5D=118.484448%2C60.000000&sctx=ZAAAAAgBEAAaKAoSCURuhhvw0UJAEe1JYHMO6EtAEhIJq7AZ4IJsiT8ReJs3Tgrzbj8iBgABAgMEBSgKOABAp5IHSAFqAnJ1nQHNzEw9oAEAqAEAvQFRStxhwgEG8oal%2B%2B8DggIT0LzQuNGA0LAg0LPRgNC40LvRjIoCAJICAJoCDGRlc2t0b3AtbWFwcw%3D%3D&sll=37.640119%2C55.814995&source=serp_navig&sspn=0.016154%2C0.004916&text=%D0%BC%D0%B8%D1%80%D0%B0%20%D0%B3%D1%80%D0%B8%D0%BB%D1%8C&utm_source=share&z=16"
              width="98%"
              height="98%"
              // frameBorder="1"
              allowFullScreen
              style={{
                position: 'relative',
                border: '3px solid #3c3b34',
                borderRadius: '10px',
              }}
            />
          </div>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}
