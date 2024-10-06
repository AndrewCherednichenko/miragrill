'use client';

import React from 'react';
import Grid from '@mui/material/Grid';

export default function TableForProducts({ product }) {
  // console.log(product);
  const { units } = product.category.data.attributes;
  return (
    <Grid
      sx={{
        fontFamily: 'TTDrugsRegular',
        p: '0 0 30px 0',
      }}
    >
      <h3 style={{ textAlign: 'center' }}>
        Пищевая ценность (на 100
        {' '}
        {units}
        ):
      </h3>
      <Grid sx={{ display: 'flex', justifyContent: 'space-between', background: '#f3f0e8' }}>
        <h4 style={{ margin: '10px' }}>белки</h4>
        <h4 style={{ margin: '10px' }}>
          {product.protein}
          {' '}
          гр
        </h4>
      </Grid>
      <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4 style={{ margin: '10px' }}>жиры</h4>
        <h4 style={{ margin: '10px' }}>
          {product.fat}
          {' '}
          гр
        </h4>
      </Grid>
      <Grid sx={{ display: 'flex', justifyContent: 'space-between', background: '#f3f0e8' }}>
        <h4 style={{ margin: '10px' }}>углеводы</h4>
        <h4 style={{ margin: '10px' }}>
          {product.ugli}
          {' '}
          гр
        </h4>
      </Grid>
      <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4 style={{ margin: '10px' }}>калорийность</h4>
        <h4 style={{ margin: '10px' }}>
          {product.calories}
          {' '}
          кКал
        </h4>
      </Grid>
      <Grid sx={{ display: 'flex', justifyContent: 'space-between', background: '#f3f0e8' }}>
        <h4 style={{ margin: '10px' }}>объем</h4>
        <h4 style={{ margin: '10px' }}>
          {product.weight}
          {' '}
          {units}
        </h4>
      </Grid>
      <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4 style={{ margin: '10px' }}>кКал на порцию</h4>
        <h4 style={{ margin: '10px' }}>{product.weight * product.calories / 100}</h4>
      </Grid>
    </Grid>
  );
}
