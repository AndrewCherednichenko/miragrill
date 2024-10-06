'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useUnit } from 'effector-react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import './fonts.css';
import InterierDownRoom from '../modals/InterierDownRoom';

import { fetchDataForPageFx, dataForPageStore } from '../store/singleTypesStore';

export default function BanketniiZal() {
  const pictureData = useUnit(dataForPageStore);
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки
  const [picture, setPicture] = useState('/images/banketnii-zal.png'); // Добавляем картинку

  useEffect(() => {
    fetchDataForPageFx()
      .then(() => {
        setIsLoading(false); // Обновляем состояние загрузки после загрузки данных
      });
  }, []);

  // const imageUrl = pictureData;

  useEffect(() => {
    if (!isLoading && pictureData && pictureData.attributes && pictureData.attributes.nizhniyzal) {
      // console.log(pictureData.attributes.nizhniyzal.data.attributes.url);
      setPicture(pictureData.attributes.nizhniyzal.data.attributes.url);
    }
  }, [isLoading, pictureData]);

  const [scrollY, setScrollY] = useState(0); // Инициализируем scrollY без использования window
  const imageRef = useRef(null);

  useEffect(() => {
    // Перемещаем обращение к window внутрь useEffect
    setScrollY(window.scrollY);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Функция для вычисления смещения изображения
  const calculateOffsetY = () => {
    if (imageRef.current) {
      const { top, height } = imageRef.current.getBoundingClientRect();
      if (top + height < 0) {
        return 1.29;
      } if (top > window.innerHeight) {
        return 0.71;
      }
      const progress = (window.innerHeight - top) / (window.innerHeight + height);
      return 0.71 + (progress * 0.58);
    }
    return 1;
  };

  // Вычисляем смещение для изображения
  const scale = 1.15;
  const offsetY = calculateOffsetY();

  if (isLoading) {
    return <div />; // Индикатор загрузки
  }

  if (!isLoading) {
    return (
      <Box sx={{
        flexGrow: 1,
        background: '#e9e6da',
        marginTop: '-15px',
        color: '#3c3b34',
      }}
      >
        <Grid sx={{
          height: '15px',
          borderLeft: '1px solid black',
          borderRight: '1px solid black',
        }}
        />
        <Grid
          container
          spacing={0}
          sx={{
            borderBottom: '1px solid black',
            borderLeft: '1px solid black',
            borderRight: '1px solid black',
          }}
        >
          {/* <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            height: '85%',
            width: '90%',
            overflow: 'hidden',
            border: '3px solid #3c3b34',
            borderRadius: '15px',
          }}
          >
            <img
              ref={imageRef}
              src="/images/banketnii-zal.png"
              style={{
                transform: `scale(${scale}) translateY(${(offsetY - 1) * 100}%)`,
                // transition: 'transform 0.5s ease-out',
                height: '100%',
                width: '100%',
                objectFit: 'cover',
              }}
              alt=""
            />
          </Box>
        </Grid> */}

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontWeight: 100,
              textAlign: 'center',
              justifyContent: 'center',
              padding: '35px !important',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Cormorant-Bold',
                fontSize: {
                  md: 'calc(13px + (63 - 13) * ((100vw - 300px) / (1200 - 300)))',
                  xs: 'calc(26px + (135 - 26) * ((100vw - 300px) / (1200 - 300)))',
                },
                mt: '20px',
              }}
              variant="h2"
              component="h2"
              gutterBottom
            >
              БАНКЕТНЫЙ
              <br />
              ЗАЛ
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Cormorant-LightItalic',
                fontSize: {
                  md: 'calc(13px + (30 - 13) * ((100vw - 300px) / (1200 - 300)))',
                  xs: 'calc(26px + (60 - 26) * ((100vw - 300px) / (1200 - 300)))',
                },
                lineHeight: '100%',
              }}
              variant="h2"
              component="h2"
              gutterBottom
            >
              место для проведения вашего торжества,
              <br />
              винотека и караоке-зал
            </Typography>
            <InterierDownRoom />
            {/* <Button
            variant="outlined"
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
                color: '#ffffff',
                backgroundColor: '#3c3b34',
                border: '0.1px solid #3c3b34',
              },
            }}
          >
            ПОСМОТРЕТЬ
          </Button> */}
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            // order: { xs: -1, md: 0 },
            }}
          >
            <Box sx={{
              height: '85%',
              width: '90%',
              overflow: 'hidden',
              border: '3px solid #3c3b34',
              borderRadius: '15px',
            }}
            >
              <img
                ref={imageRef}
                // src="/images/banketnii-zal.png"
                src={`http://localhost:1337${picture}`}
                style={{
                  transform: `scale(${scale}) translateY(${(offsetY - 1) * 100}%)`,
                  // transition: 'transform 0.5s ease-out',
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                }}
                alt=""
              />
            </Box>
          </Grid>

        </Grid>
      </Box>
    );
  }
}
