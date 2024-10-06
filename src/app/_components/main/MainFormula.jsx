'use client';

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import './fonts.css';

export default function MainFormula() {
  return (
    <Box sx={{
      flexGrow: 1,
      background: '#e9e6da',
      height: 'content',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '7% 0 7% 0',
      position: 'relative',
      borderLeft: '1px solid black',
      borderRight: '1px solid black',
      borderBottom: '1px solid black',
      borderRadius: '0 0 10px 10px',
    }}
    >
      <Grid sx={{
        // padding: '20px 0 20px 0',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        color: '#3c3b34',
        alignItems: 'center',
        // justifyContent: 'center',
      }}
      >
        <Typography
          sx={{
            fontFamily: 'TTDrugs-Bold',
            fontSize: {
              md: 'calc(8px + (15 - 8) * ((100vw - 300px) / (1200 - 300)))',
              xs: 'calc(8px + (21 - 8) * ((100vw - 300px) / (1200 - 300)))',
            },
            // mt: '30px',
          }}
          variant="h2"
          component="h2"
          gutterBottom
        >
          ДОБРО ПОЖАЛОВАТЬ
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Cormorant-Bold',
            fontSize: {
              md: 'calc(13px + (63 - 13) * ((100vw - 300px) / (1200 - 300)))',
              xs: 'calc(21px + (90 - 26) * ((100vw - 300px) / (1200 - 300)))',
            },
            // mt: '20px',
          }}
          variant="h2"
          component="h2"
          gutterBottom
        >
          Формула Мирагриль
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Cormorant-LightItalic',
            fontSize: {
              md: 'calc(13px + (63 - 13) * ((100vw - 300px) / (1200 - 300)))',
              xs: 'calc(21px + (90 - 26) * ((100vw - 300px) / (1200 - 300)))',
            },
            lineHeight: '100%',
          }}
          variant="h2"
          component="h2"
          gutterBottom
        >
          это изысканные вина,
          <br />
          нежнейшие стейки
          <br />
          и уютный интерьер
        </Typography>
        <Grid sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
          <a style={{ textDecoration: 'none' }} href="#menu-link">
            <Button
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
                m: '10% 10px 0 10px',
                // textDecoration: 'none',
                // mr: '10px',
                '&:hover': {
                  color: '#ffffff', // Цвет текста при наведении
                  backgroundColor: '#3c3b34', // Пример изменения фона при наведении
                  border: '0.1px solid #3c3b34',
                },
              }}
            >
              МЕНЮ
            </Button>
          </a>
          <a style={{ textDecoration: 'none' }} href="#interier">
            <Button
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
                m: '10% 10px 0 10px',
                '&:hover': {
                  color: '#ffffff', // Цвет текста при наведении
                  backgroundColor: '#3c3b34', // Пример изменения фона при наведении
                  border: '0.1px solid #3c3b34',
                },
              }}
            >
              ИНТЕРЬЕР
            </Button>
          </a>
        </Grid>
        <img
          style={{
            width: '7vw',
            position: 'absolute',
            left: '10%',
            top: '20%',
          }}
          src="/images/glass.png"
          alt=""
        />
        <img
          style={{
            width: '10vw',
            position: 'absolute',
            right: '10%',
            bottom: '20%',
          }}
          src="/images/column.png"
          alt=""
        />
      </Grid>
    </Box>
  );
}
