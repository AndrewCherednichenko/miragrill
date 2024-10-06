'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function MenuItemForPage({ category }) {
  if (!category.attributes.link) {
    console.error('Link is undefined for category', category);
    return null;
  }

  const imageUrl = category.attributes.catimg.data.attributes.url;
  const { catname } = category.attributes;

  return (
    <Grid
      item
      className="classss"
      sx={{
        border: '1px solid black',
        borderRadius: '200px',
        width: { xs: '32vw', sm: '28vw' },
        // minWidth: '120px',
        maxWidth: '300px !important',
        padding: '3% 1% 1% 1%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        m: '3%',
        overflow: 'hidden',
      }}
    >
      <Link
        style={{
          // border: '1px solid black',
          // borderRadius: '200px',
          // minWidth: '22vw',
          // maxWidth: '300px !important',
          // padding: '3% 1% 1% 1%',
          width: 'content',
          display: 'flex',
          flexDirection: 'column',
          textDecoration: 'none',
          color: '#3c3b34',
          // alignItems: 'center',
          // m: '3%',
          // overflow: 'hidden',
        }}
        href={category.attributes.link}
      >

        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: { xs: '40vw', sm: '30vw' },
            maxHeight: { xs: '40vw', sm: '30vw' },
            // height: 'auto', // Обеспечивает адаптивность высоты
          }}
          key={imageUrl}
        >
          <img
            style={{
              height: 'calc(40vw / 100 * 60)',
              minHeight: '120px',
              // height: '60%', // Убираем, чтобы не было конфликтов
              width: 'auto',
              // maxHeight: '336px',
            }}
            src={`http://localhost:1337${imageUrl}`}
            alt=""
          />
        </Grid>
        <Typography
          sx={{
            fontFamily: 'Cormorant-Bold',
            fontSize: {
              md: 'calc(20px + (30 - 20) * ((100vw - 300px) / (1200 - 300)))',
              xs: 'calc(15px + (40 - 15) * ((100vw - 300px) / (1200 - 300)))',
            },
            mb: { xs: '7%', sm: '7%', md: '10%' },
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
          variant="h3"
          component="h3"
          gutterBottom
          key={catname}
        >
          {catname.split(' ').map((word, index) => (
            <React.Fragment key={index}>
              {word}
              <br />
            </React.Fragment>
          ))}
        </Typography>
      </Link>
    </Grid>
  );
}
