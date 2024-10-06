'use client';

import {
  useRef, useState, useEffect, useCallback,
} from 'react';
import { useUnit } from 'effector-react';
// import Link from 'next/link';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { fetchCategoriesFx, categoriesStore } from '../store/store';
import MenuItem from './MenuItem';
// import ArrowLeft from '../_components/ArrowLeft';
import ArrowLeft from '../ArrowLeft';
import ArrowRight from '../ArrowRight';

export default function Menu() {
  const categories = useUnit(categoriesStore);
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

  useEffect(() => {
    fetchCategoriesFx()
      .then(() => {
        setIsLoading(false); // Обновляем состояние загрузки после загрузки данных
      });
  }, []);

  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  // useEffect(() => {
  //   const scrollContainer = scrollContainerRef.current;

  //   if (scrollContainer) {
  //     checkScrollPosition();
  //     scrollContainer.addEventListener('scroll', checkScrollPosition);

  //     // Функция для очистки
  //     return () => {
  //       scrollContainer.removeEventListener('scroll', checkScrollPosition);
  //     };
  //   }

  //   // Возвращает пустую функцию, если scrollContainer не существует
  //   return () => {};
  // }, []);
  useEffect(() => {
    if (scrollContainerRef.current) {
      checkScrollPosition();
    }
  }, [categories]);

  const scroll = (distance) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: distance, behavior: 'smooth' });
      setTimeout(() => {
        checkScrollPosition(); // Увеличение времени для уверенности в завершении прокрутки
      }, 200);
    }
  };
  const scrollLeft = () => {
    scroll(-300);
  };
  const scrollRight = () => {
    scroll(300);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Индикатор загрузки
  }

  if (categories.length > 0) {
    return (
      <Box
        id="menu-link"
        sx={{
          background: '#e0ddcf',
          marginTop: '-15px',
          color: '#3c3b34',
          border: '1px solid black',
          borderRadius: '10px 10px 0 0',
        }}
      >
        <Grid
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '10%',
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontFamily: 'TTDrugs-Bold',
              fontSize: {
                md: 'calc(8px + (15 - 8) * ((100vw - 300px) / (1200 - 300)))',
                xs: 'calc(8px + (21 - 8) * ((100vw - 300px) / (1200 - 300)))',
              },
              mt: '20px',
            }}
          >
            ПРИЯТНОГО АППЕТИТА
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontFamily: 'Cormorant-Bold',
              fontSize: '10vw',
              mt: '20px',
            }}
          >
            ЧТО В МЕНЮ?
          </Typography>
        </Grid>

        <Grid sx={{ position: 'relative' }}>
          {showLeftArrow && <ArrowLeft scrollLeft={scrollLeft} />}
          {showRightArrow && <ArrowRight scrollRight={scrollRight} />}
          <Grid
            container
            ref={scrollContainerRef}
            onScroll={checkScrollPosition}
            spacing={0}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              width: '100%',
              padding: '0 20px 0 20px',
            }}
          >
            {categories.map((category) => (
              // <Link href={category.attributes.link}>
              <MenuItem key={category.id} category={category} />
              // </Link>
            ))}
            {/* <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem /> */}
          </Grid>

          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px 0 40px 0',
            }}
          >
            <a style={{ textDecoration: 'none' }} href="#zabronirovat-stol">
              <Button
                variant="outlined"
                sx={{
                  fontFamily: 'TTDrugs-Bold',
                  fontSize: {
                    md: '9px',
                    xs: '9px',
                  },
                  color: '#3c3b34',
                  width: '170px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '0.1px solid #3c3b34',
                  // mt: '10%',
                  margin: 0,
                  '&:hover': {
                    color: '#ffffff',
                    backgroundColor: '#3c3b34',
                    border: '0.1px solid #3c3b34',
                  },
                }}
              >
                ЗАБРОНИРОВАТЬ СТОЛ
              </Button>
            </a>
          </Grid>
        </Grid>
      </Box>
    );
  }
}
