'use client';

import React, { useState, useEffect } from 'react';
import { useUnit } from 'effector-react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import QuestionModal from '../modals/QuestionModal';
import Map from '../map/Map';

import {
  fetchContactsFx, contactsStore,
} from '../store/singleTypesStore';

// функция для очищения номеров от пробелов, скобок и тире
function sanitizePhoneNumber(number) {
  return number.replace(/[()\s-]/g, '');
}

export default function Contacts() {
  const contactsData = useUnit(contactsStore);

  // console.log(contactsData.attributes);

  const [contacts, setContacts] = React.useState({
    phone: '+7 (495) 683-80-40',
    whatsapp: '+7 (987) 670-11-94',
    telegram: '+7 (987) 670-11-94',
    email: 'miragrill@yandex.ru',
    vk: 'https://vk.com/miragrill.moscow',
    instagram: 'https://www.instagram.com/miragrill.moscow',
  });

  React.useEffect(() => {
    fetchContactsFx();
  }, []);

  React.useEffect(() => {
    if (contactsData && contactsData.attributes) {
      setContacts({
        phone: contactsData.attributes.phone,
        whatsapp: contactsData.attributes.whatsapp,
        telegram: contactsData.attributes.telegram,
        email: contactsData.attributes.email,
        vk: contactsData.attributes.vk,
        instagram: contactsData.attributes.instagram,
      });
    }
    // console.log(contacts);
  }, [contactsData]);

  const [openQuestionModal, setOpenQuestionModal] = useState(false);

  const handleOpenQuestionModal = () => setOpenQuestionModal(true);
  const handleCloseQuestionModal = () => setOpenQuestionModal(false);

  return (
    <Box
      sx={{
        flexGrow: 1,
        background: '#e0ddcf',
        color: '#3c3b34',
        border: '1px solid black',
        borderRadius: '10px',
        marginTop: '-15px',
        paddingTop: '30px',
        position: 'relative',
        height: 'content',
        zIndex: 60,
      }}
    >
      <Grid
        container
        spacing={0}
      >
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            fontWeight: 100,
            textAlign: 'center',
            padding: '5vw !important',
          }}
          item
          xs={12}
          sm={12}
          md={8}
        >
          <Typography
            sx={{
              fontFamily: 'Cormorant-Regular',
              textAlign: 'left',
              fontSize: '10vw',
              ml: { xs: '20vw', sm: '20vw', md: '0vw' },
            }}
            variant="h2"
            component="h2"
            gutterBottom
          >
            СВЯЗЬ
            {' '}
            <br />
            <img
              style={{
                width: '8vw',
                marginRight: '3vw',
              }}
              src="/images/mg-eye.png"
              alt=""
            />
            С НАМИ
          </Typography>
          <Typography
            sx={{
              fontFamily: 'TTDrugsRegular',
              textAlign: 'center',
              fontSize: '3vw',
              mb: { xs: '0px', sm: '0px', md: '7vw' },
            }}
            variant="h3"
            component="h3"
            gutterBottom
          >
            <a
              style={{ textDecoration: 'none', color: '#3c3b34' }}
              href={`mailto:${contacts.email}`}
            >
              {contacts.email}
            </a>
          </Typography>
          <Grid
            sx={{
              border: '2px solid #3c3b34',
              borderRadius: '10px',
              display: { xs: 'none', sm: 'none', md: 'flex' },
              width: '100%',
              height: '100%',
            }}
          >
            <Map />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          sx={{
            overflow: 'hidden',
            display: 'flex',
            p: '5vw 3vw',
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Cormorant-LightItalic',
              fontSize: { xs: '5vw', sm: '5vw', md: '3vw' },
            }}
            variant="h3"
            component="h3"
            gutterBottom
          >
            Мы всегда открыты
            к диалогу и с радостью
            узнаем ваше мнение по
            поводу нашего заведения
            или выслушаем ваши
            предложения
            <br />
            <br />
            <span>
              Ваши вопросы вы можете
              задать
              {' '}
              <span
                role="button"
                style={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
                onClick={handleOpenQuestionModal}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleOpenQuestionModal();
                  }
                }}
                tabIndex={0}
              >
                здесь
              </span>
              <QuestionModal open={openQuestionModal} onClose={handleCloseQuestionModal} />
            </span>
            <span>
              <br />
              <br />
              Мы в социальных сетях
              {' '}
              <br />
              <a style={{ textDecoration: 'none' }} href={`${contacts.vk}`} target="_blank" rel="noreferrer">Вконтакте</a>
              <br />
              <a style={{ textDecoration: 'none' }} href={`${contacts.instagram}`} target="_blank" rel="noreferrer">Instagram</a>
            </span>
            <br />
            <br />
            проспект Мира 124к4
            <br />
            <a
              style={{ textDecoration: 'none', color: '#3c3b34' }}
              href={`tel:${sanitizePhoneNumber(contacts.phone)}`}
              rel="noreferrer"
              alt="позвонить в ресторан Мирагриль"
            >
              {contacts.phone}
            </a>

          </Typography>
          <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
            <a
              target="_blank"
              href={`https://wa.me/${sanitizePhoneNumber(contacts.telegram)}`}
              rel="noreferrer"
              alt="написать в telegram ресторана Мирагриль"
            >
              <img style={{ width: '35px', height: '35px' }} src="/images/icons/tlgrm.png" alt="написать в telegram ресторана Мирагриль" />
            </a>
            <a
              target="_blank"
              href={`https://t.me/${sanitizePhoneNumber(contacts.whatsapp)}`}
              rel="noreferrer"
              alt="написать в whatsapp ресторана Мирагриль"
            >
              <img style={{ width: '35px', height: '35px', marginLeft: '10px' }} src="/images/icons/whtsp.png" alt="написать в whatsapp ресторана Мирагриль" />
            </a>
          </Grid>
        </Grid>

        <Grid sx={{ padding: '10px' }}>
          <Grid
            sx={{
              border: '2px solid #3c3b34',
              borderRadius: '10px',
              width: '94vw',
              height: '50vw',
              display: { xs: 'flex', sm: 'flex', md: 'none' },
            }}
          >
            <Map />
          </Grid>
        </Grid>

      </Grid>
    </Box>
  );
}
