'use client';

import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ButtonShop from '../buttons/ButtonShop';
import ButtonDelete from '../buttons/ButtonDelete';
import { incrementItem, decrementItem, removeItem } from '../store/cartStore';

import './goodInCart.css';

export default function GoodInCart({ item }) {
  const imageUrl = item.product.attributes.prodimg.data.attributes.url;
  const { prodname } = item.product.attributes;
  const { description } = item.product.attributes;
  const { price } = item.product.attributes;
  const { id } = item.product;
  const { quantity } = item;

  return (
    <Grid
      sx={{
        width: '280px',
        minHeight: '126px',
        // height: 'calc(auto + 10px)',
        // height: 'content',
        border: '1px solid #3c3b34',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        m: '7px 0',
        // padding: '7px 0',
        // pb: '10px',
        // pt: '10px',
      }}
    >
      <Grid
        sx={{
          height: '107px',
          width: '70px',
          //   background: 'red',
          overflow: 'hidden',
          border: '1.5px solid #3c3b34',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '7px 0',
        }}
      >
        <img style={{ height: 'auto', width: '100%' }} src={`http://localhost:1337${imageUrl}`} alt="" />
      </Grid>
      <Grid
        sx={{
        //   height: '107px',
          width: '180px',
          fontFamily: 'Cormorant-Medium',
          overflow: 'hidden',
          //   p: '0 3px',
          color: '#3c3b34',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Cormorant-Bold',
            fontSize: '15px',
            mt: '10px',
            textAlign: 'left',
            textTransform: 'uppercase',
          }}
          variant="h3"
          component="h3"
          gutterBottom
          key={prodname}
        >
          {prodname}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'TTDrugsRegular',
            fontSize: '15px',
            mt: '10px',
            textAlign: 'left',
          }}
          variant="h3"
          component="h3"
          gutterBottom
          key={price}
        >
          {price}
          {' '}
          ₽
        </Typography>
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center',
            // m: '5px 0 5px 0',
            m: 1,
          }}
        >
          <ButtonShop symbol="-" handler={() => decrementItem(id)} />
          <TextField
            inputProps={{
              min: 0,
              max: 99999,
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
            id="outlined-number"
            type="text"
            value={quantity}
            InputLabelProps={{
              shrink: true,
            }}
            disabled
            sx={{
              textAlign: 'center',
              width: '50px',
              height: '30px',
              p: 0,
              m: '2px 5px 0 5px',
              '& .MuiOutlinedInput-input': {
                p: '2px',
              },
              '& .MuiOutlinedInput-root': {
                '&.Mui-disabled': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#35342e',
                    border: '1.5px solid #3c3b34',
                    borderRadius: '15px',
                  },
                },
              },
              '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled': {
                fontWeight: '400',
                opacity: '1 !important',
                WebkitTextFillColor: '#35342e',
                textAlign: 'center',
              },
            }}
          />
          <ButtonShop symbol="+" handler={() => incrementItem(id)} />
          <ButtonDelete symbol="+" handler={() => removeItem(id)} />
        </Grid>
      </Grid>
    </Grid>
  );
}
