'use client';

import { useRef, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Link from 'next/link';

export default function Delivery() {
  const leftWingRef = useRef(null);
  // const leftWingRef2 = useRef(null);
  const rightWingRef = useRef(null);
  // const rightWingRef2 = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const position = window.pageYOffset;
  //     setScrollPosition(position);
  //     checkPosition();
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const checkPosition = () => {
    const leftWing = leftWingRef.current;
    // const leftWing2 = leftWingRef2.current;
    const rightWing = rightWingRef.current;
    // const rightWing2 = rightWingRef2.current;

    if (leftWing && rightWing) {
      // Получаем текущую позицию прокрутки
      const scrollY = window.pageYOffset;

      // Вычисляем угол поворота на основе прокрутки
      // Каждые 50px прокрутки угол поворота изменяется на 45 градусов туда и обратно
      const rotation = Math.sin(scrollY / 100) * 35;
      // const rotation2 = Math.sin(scrollY / 50) * 25;

      leftWing.style.transform = `rotateY(${rotation}deg)`;
      // leftWing2.style.transform = `rotateY(${rotation}deg)`;
      rightWing.style.transform = `rotateY(${-rotation}deg)`;
      // rightWing2.style.transform = `rotateY(${-rotation}deg)`;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      checkPosition();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box sx={{
      background: '#e9e6da',
      marginTop: '-15px',
      color: 'white',
      borderLeft: '1px solid black',
      borderRight: '1px solid black',
      //   borderRadius: '10px',
      position: 'relative',
      //   overflow: 'hidden',
      paddingBottom: '5%',
      height: '95vw',
      zIndex: 50,
    }}
    >

      <Grid sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '5%',
        position: 'relative',
        zIndex: 101,
      }}
      >
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            fontFamily: 'Cormorant-Medium',
            fontSize: '4vw',
            mt: '28vw',
            mb: 0,
            textAlign: 'center',
            lineHeight: '1.2em',
          }}
        >
          ДОСТАВКА
          <br />
          {' '}
          ИЗ РЕСТОРАНА
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Cormorant-LightItalic',
            color: 'white',
            fontSize: '3.3vw',
            // fontSize: 'calc(13px + (30 - 13) * ((100vw - 300px) / (1200 - 300)))',
            mt: '2vw',
            mb: '3.5vw',
            lineHeight: '100%',
            textAlign: 'center',
          }}
          variant="h2"
          component="h2"
          gutterBottom
        >
          Насладитесь изысканными
          <br />
          {' '}
          блюдами от одного из лучших
          <br />
          {' '}
          шеф-поваров Москвы
          <br />
          {' '}
          у себя дома
        </Typography>
      </Grid>

      <Grid
        ref={leftWingRef}
        sx={{
          position: 'absolute',
          left: '1%',
          top: '18%',
          transformOrigin: 'right center',
          //   transition: 'transform 0.5s', // Плавное вращение
          zIndex: 100,
          // transform: 'rotate(50deg)',
        }}
      >
        <img style={{ height: '42vw' }} src="/images/left-wing.png" alt="" />
      </Grid>
      {/* <Grid
        ref={leftWingRef2}
        sx={{
          position: 'absolute',
          left: '1%',
          top: '14%',
          transformOrigin: 'right center',
          //   transition: 'transform 0.5s', // Плавное вращение
          zIndex: 100,
        }}
      >
        <img style={{ height: '42vw' }} src="/images/left-wing.png" alt="" />
      </Grid> */}

      <Grid
        ref={rightWingRef}
        sx={{
          position: 'absolute',
          right: '-0.3%',
          top: '19%',
          transformOrigin: 'left center',
          //   transition: 'transform 0.5s', // Плавное вращение
          zIndex: 100,
        }}
      >
        <img style={{ height: '40vw' }} src="/images/right-wing.png" alt="" />
      </Grid>
      {/* <Grid
        ref={rightWingRef2}
        sx={{
          position: 'absolute',
          right: '-0.3%',
          top: '15%',
          transformOrigin: 'left center',
          //   transition: 'transform 0.5s', // Плавное вращение
          zIndex: 100,
        }}
      >
        <img style={{ height: '40vw' }} src="/images/right-wing.png" alt="" />
      </Grid> */}

      <Grid sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        zIndex: 10,
      }}
      >
        <img style={{ height: '96vw' }} src="/images/delivery-sun.svg" alt="" />
      </Grid>

      <Link href="/menu">
        <Button
          variant="outlined"
          sx={{
            fontFamily: 'TTDrugs-Bold',
            fontSize: { xs: '2vw', sm: '2vw', md: '15px' },
            color: 'white',
            width: '25vw',
            height: '5.4vw',
            borderRadius: '50%',
            border: '0.1px solid white',
            // mt: '10%',
            margin: 0,
            mt: '0.1vw',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            '&:hover': {
              color: '#2e2e27',
              backgroundColor: 'white',
              border: '0.1px solid #3c3b34',
            },
            zIndex: 101,
          }}
        >
          В МЕНЮ
        </Button>
      </Link>

      {/* position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
           */}
      {/* <Grid sx={{
        border: '1px solid white',
        width: '90vw',
        height: '90vw',
        borderRadius: '50%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        display: { xs: 'none', sm: 'none', md: 'flex' },
      }}
      /> */}
      {/* <Grid sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '5%',
      }}
      >
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            fontFamily: 'TTDrugsRegular',
            fontSize: {
              md: 'calc(8px + (15 - 8) * ((100vw - 300px) / (1200 - 300)))',
              xs: 'calc(8px + (21 - 8) * ((100vw - 300px) / (1200 - 300)))',
            },
            mt: '20px',
          }}
        >
          ЗАБРОНИРОВАТЬ СТОЛ
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            fontFamily: 'Cormorant-Medium',
            fontSize: '10vw',
            mt: '20px',
            mb: 0,
            textAlign: 'center',
            lineHeight: '1.2em',
          }}
        >
          КОГДА ВАС
          {' '}
          <br />
          ЖДАТЬ?
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Cormorant-LightItalic',
            color: 'white',
            fontSize: 'calc(13px + (30 - 13) * ((100vw - 300px) / (1200 - 300)))',
            mt: '20px',
            mb: '40px',
            lineHeight: '100%',
          }}
          variant="h2"
          component="h2"
          gutterBottom
        >
          заполните форму чтобы забронировать стол
        </Typography>

      </Grid> */}

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
            width: '60%',
            display: 'flex',
            // flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />

      </Grid>
    </Box>
  );
}
