'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function ProductItem({ product }) {
  if (!product.attributes.link) {
    console.error('Link is undefined for product', product);
    return null;
  }

  const imageUrl = product.attributes.prodimg.data.attributes.url;
  const { prodname } = product.attributes;
  const { description } = product.attributes;
  // console.log(product.attributes.subcategory.data.attributes.subcat_name, 'subcat-name');
  // console.log(product.attributes.subcategory.data.attributes.subcat_rank, 'subcat-rank');

  return (
    <Grid sx={{
      width: '290px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}
    >
      <Grid
        item
        sx={{
          border: '1px solid black',
          borderRadius: '200px',
          minWidth: '270px',
          // minWidth: { xs: '32vw', sm: '22vw' },
          maxWidth: '270px !important',
          // maxWidth: '300px !important',
          maxHeight: '400px',
          minHeight: '400px',
          padding: '3% 1% 1% 1%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // m: '3%',
          p: 0,
          overflow: 'hidden',
        }}
      >
        <Grid
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
          // href={product.attributes.link}
        >
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            // maxHeight: '450px',
            // maxHeight: { xs: '40vw', sm: '30vw' },
            }}
            key={imageUrl}
          >
            {/* <img style={{ height: '500px', width: 'auto' }} src={`http://172.20.10.2:1337${imageUrl}`} alt="" /> */}
            <img style={{ height: '500px', width: 'auto' }} src={`http://localhost:1337${imageUrl}`} alt="" />
          </Grid>
        </Grid>
      </Grid>
      <Typography
        sx={{
          fontFamily: 'Cormorant-Bold',
          m: '10px 0 0 0',
          height: '66px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          textAlign: 'center',
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
          // m: '0 0 10px 0',
          height: '49px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '17px',
          textAlign: 'center',
          // textTransform: 'uppercase',
        }}
        variant="h3"
        component="h3"
        gutterBottom
        key={description}
      >
        {description}
      </Typography>
      {/* {product.attributes.description} */}
    </Grid>
  );
}
