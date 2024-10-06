'use client';

import React, { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { useUnit } from 'effector-react';
import { fetchProductsFx, productsStore } from '../_components/store/store';

import '../_components/css/fonts.css';

export default function OneProduct() {
  const products = useUnit(productsStore);
  console.log(products);
  // if (products.length > 0) {
  //   const name = products[0].attributes.prodname;
  //   console.log(name);
  // }
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

  useEffect(() => {
    fetchProductsFx()
      .then(() => {
        setIsLoading(false); // Обновляем состояние загрузки после загрузки данных
      });
  }, []);
  //   const [scrollY, setScrollY] = useState(0); // Инициализируем scrollY без использования window
  //   const imageRef = useRef(null);

  //   useEffect(() => {
  //     // Перемещаем обращение к window внутрь useEffect
  //     setScrollY(window.scrollY);

  //     const handleScroll = () => {
  //       setScrollY(window.scrollY);
  //     };

  //     window.addEventListener('scroll', handleScroll);
  //     return () => {
  //       window.removeEventListener('scroll', handleScroll);
  //     };
  //   }, []);

  //   // Функция для вычисления смещения изображения
  //   const calculateOffsetY = () => {
  //     if (imageRef.current) {
  //       const { top, height } = imageRef.current.getBoundingClientRect();
  //       if (top + height < 0) {
  //         return 1.29;
  //       } if (top > window.innerHeight) {
  //         return 0.71;
  //       }
  //       const progress = (window.innerHeight - top) / (window.innerHeight + height);
  //       return 0.71 + (progress * 0.58);
  //     }
  //     return 1;
  //   };

  //   // Вычисляем смещение для изображения
  //   const scale = 1.15;
  //   const offsetY = calculateOffsetY();

  if (products.length > 0) {
    return (
      <Box sx={{
        flexGrow: 1,
        background: '#e9e6da',
        marginTop: '35px',
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
          <Grid
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
              height: '85%', width: '90%', overflow: 'hidden', border: '3px solid #3c3b34', borderRadius: '15px',
            }}
            >
              <img
                // ref={imageRef}
                src="/images/steakMB.jpg"
                style={{
                  // transform: `scale(${scale}) translateY(${(offsetY - 1) * 100}%)`,
                  // transition: 'transform 0.5s ease-out',
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                }}
                alt=""
              />
            </Box>
          </Grid>

          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontWeight: 100,
              textAlign: 'center',
              justifyContent: 'center',
              padding: '35px !important',
              order: { xs: -1, md: 0 },
            }}
            item
            xs={12}
            sm={12}
            md={6}
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
              {products[0].attributes.prodname}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Cormorant-LightItalic',
                fontSize: {
                  md: 'calc(13px + (30 - 13) * ((100vw - 300px) / (1200 - 300)))',
                  xs: 'calc(26px + (60 - 26) * ((100vw - 300px) / (1200 - 300)))',
                },
                lineHeight: '100%',
                textAlign: 'left',
              }}
              variant="h2"
              component="h2"
              gutterBottom
            >
              {/* {products[0].attributes.product_article} */}
              {products[0].attributes.product_article.split('\n').map((word, index) => (
                <React.Fragment key={index}>
                  {word}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
            <div style={{
              width: '100%',
              height: '1px',
              background: '#3c3b34',
              marginTop: '15px',
            }}
            />
            <Grid sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
            }}
            >
              <h2
                style={{
                //   width: '180px',
                  fontSize: '40px',
                  textAlign: 'left',
                  lineHeight: '15px',
                }}
              >
                22300 ₽
              </h2>

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
                  //   mt: '10%',
                  //   mr: '10%',
                  '&:hover': {
                    color: '#ffffff', // Цвет текста при наведении
                    backgroundColor: '#3c3b34', // Пример изменения фона при наведении
                    border: '0.1px solid #3c3b34',
                  },
                }}
              >
                ЗАКАЗАТЬ
              </Button>
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
                  //   mt: '10%',
                  //   ml: '5%',
                  '&:hover': {
                    color: '#ffffff', // Цвет текста при наведении
                    backgroundColor: '#3c3b34', // Пример изменения фона при наведении
                    border: '0.1px solid #3c3b34',
                  },
                }}
              >
                СРАВНИТЬ
              </Button>
            </Grid>
          </Grid>
        </Grid>

      </Box>
    );
  }
}
