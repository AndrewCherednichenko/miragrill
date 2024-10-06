'use client';

import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function Main() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const imageWidth = Math.min(100, 50 + scrollPosition / 5); // Пример расчёта ширины, нужно настроить под ваш случай

  return (
    <Box sx={{ flexGrow: 1, background: '#e9e6da', color: '#3c3b34' }}>
      <Grid sx={{
        height: '55px',
        borderLeft: '1px solid black',
        borderRight: '1px solid black',
      }}
      />
      <Grid
        sx={{
          borderBottom: '1px solid black',
          borderLeft: '1px solid black',
          borderRight: '1px solid black',
          height: { md: '100vh', sm: 'content' },
        }}
        container
        spacing={0}
      >
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontWeight: 100,
            textAlign: 'center',
            justifyContent: 'center',
            padding: '35px !important',
          }}
          item
          xs={12}
          sm={12}
          md={6}
        >
          <Grid sx={{ width: '40%', display: { xs: 'none', sm: 'none', md: 'flex' } }}>
            <img
              style={{
                width: '100%',
                height: '100%',
              }}
              src="/images/logoMG.png"
              alt=""
            />
          </Grid>
          <Typography
            sx={{
              fontFamily: 'Cormorant-Bold',
              fontSize: {
                md: 'calc(33px + (73 - 33) * ((100vw - 300px) / (1200 - 300)))',
                xs: 'calc(33px + (135 - 33) * ((100vw - 300px) / (1200 - 300)))',
              },
              mt: '20px',
            }}
            variant="h1"
            component="h1"
            gutterBottom
          >
            МИРАГРИЛЬ
          </Typography>
          <div style={{ width: '90%', height: '2px', background: 'black' }} />
          <Typography
            sx={{
              fontFamily: 'Cormorant-LightItalic',
              fontSize: {
                md: 'calc(13px + (33 - 13) * ((100vw - 300px) / (1200 - 300)))',
                xs: 'calc(24px + (95 - 24) * ((100vw - 300px) / (1200 - 300)))',
              },
              lineHeight: '100%',
            }}
            variant="h2"
            component="h2"
            gutterBottom
          >
            ресторан и стейк-хаус
            <br />
            на проспекте Мира
            <br />
            124к4
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            overflow: 'hidden',
            display: { xs: 'none', sm: 'none', md: 'flex' },
          }}
        >
          <img
            src="/images/steakMain.png"
            style={{
              height: '100%',
              width: `${imageWidth}%`,
              // transition: 'width 0.5s ease-out', // Добавьте плавный переход, если нужно
              objectFit: 'cover',
              position: 'absolute', // Добавлено для наложения изображения на текст
              right: '9px', // Позиционирование справа
              top: '62px',
              maxWidth: 'calc(100vw - 18px)',
            }}
            alt=""
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            overflow: 'hidden', // Добавляем это, чтобы обрезать выступающую часть изображения
            display: { sm: 'flex', md: 'none' },
          }}
        >
          <img
            src="/images/steakMain.png"
            style={{
              height: '100%',
              width: '100%', // Изменяем на 100% чтобы изображение заполняло ширину элемента
              objectFit: 'cover', // Это обеспечит заполнение пространства и обрезку лишнего
              padding: 0,
            }}
            alt=""
          />
        </Grid>
      </Grid>
    </Box>
  );
}
