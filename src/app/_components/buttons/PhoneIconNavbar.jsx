import React, { useState, useEffect, useRef } from 'react';
import { useUnit } from 'effector-react';
import Grid from '@mui/material/Grid';

import {
  fetchContactsFx, contactsStore,
} from '../store/singleTypesStore';

// функция для очищения номеров от пробелов, скобок и тире
function sanitizePhoneNumber(number) {
  return number.replace(/[()\s-]/g, '');
}

export default function PhoneIconNavbar() {
  const contactsData = useUnit(contactsStore);

  // console.log(contactsData.attributes);

  const [contacts, setContacts] = React.useState({
    phone: '+7 (495) 683-80-40',
    whatsapp: '+7 (987) 670-11-94',
    telegram: '+7 (987) 670-11-94',
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
      });
    }
    // console.log(contacts);
  }, [contactsData]);

  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    // Функция для проверки клика вне компонента
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    }

    // Добавление обработчика событий при монтировании компонента
    document.addEventListener('mousedown', handleClickOutside);

    // Удаление обработчика событий при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <Grid ref={wrapperRef} sx={{ display: 'flex', justifyContent: 'center' }}>
      {/* <PhoneIphoneIcon
        onClick={toggleVisibility}
        // fontSize="large"
        style={{
          marginTop: '0px',
          fontSize: '30px',
          cursor: 'pointer',
          color: 'black',
          // position: 'fixed',
          // right: '129px',
          // top: '80px',
          zIndex: 1000,
        }}
      /> */}
      <button
        onClick={toggleVisibility}
        type="button"
        style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
        }}
      >
        <img style={{ height: '28px', marginRight: '8px' }} src="/images/phone-icon.png" alt="Phone icon" />
      </button>
      <Grid
        className={`smm-mobile-wrapper ${isVisible ? 'visible' : ''}`}
        sx={{
          position: 'fixed',
          marginRight: '10px',
          width: '40px',
          height: isVisible ? '140px' : '0px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#f4f2eb',
          borderRadius: '0 0 7px 7px',
          overflow: 'hidden',
          transition: 'height 0.3s ease-in-out',
          zIndex: 1100,
        }}
      >
        <a
          style={{
            height: '40px',
          }}
          target="_blank"
          href={`tel:${sanitizePhoneNumber(contacts.phone)}`}
          rel="noreferrer"
          alt="позвонить в ресторан Мирагриль"
        >
          <img style={{ height: '28px' }} src="/images/icons/phone-handset-icon.webp" alt="" />
        </a>
        <a
          style={{
            height: '40px',
            // marginRight: '3px',
          }}
          target="_blank"
          href={`https://wa.me/${sanitizePhoneNumber(contacts.whatsapp)}`}
          rel="noreferrer"
          alt="написать в whatsapp ресторана Мирагриль"
        >
          <img style={{ height: '28px' }} src="/images/icons/whtsp-phone.webp" alt="" />
        </a>
        <a
          style={{ height: '40px' }}
          target="_blank"
          href={`https://t.me/${sanitizePhoneNumber(contacts.telegram)}`}
          rel="noreferrer"
          alt="написать в telegram ресторана Мирагриль"
        >
          <img style={{ height: '28px' }} src="/images/icons/tlgrm-phone.webp" alt="" />
        </a>
      </Grid>
    </Grid>
  );
}
