'use client';

import React, { useState, useEffect } from 'react';
import { useUnit } from 'effector-react';
import Grid from '@mui/material/Grid';

import {
  fetchTableForBanquetFx, tableForBanquetStore,
} from '../store/singleTypesStore';

export default function TableForBanquetes() {
  const formatNumber = (num) => {
    if (num) {
      const numStr = num.toString(); // Преобразуем число в строку
      return numStr.replace(/(\d{3})(\d{3})/, '$1 $2');
    }
    return num;
  };

  const tableData = useUnit(tableForBanquetStore);
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки
  const [table, setTable] = useState({}); // Добавляем данные для таблицы

  useEffect(() => {
    fetchTableForBanquetFx()
      .then(() => {
        setIsLoading(false); // Обновляем состояние загрузки после загрузки данных
      });
  }, []);

  useEffect(() => {
    if (!isLoading && tableData && tableData.attributes) {
    // if (!isLoading && tableData && tableData.attributes && tableData.attributes.banketi) {
      // console.log(tableData.attributes);
      setTable(tableData.attributes);
    }
  }, [isLoading, tableData]);
  // console.log(product);
  //   const { units } = product.category.data.attributes;
  if (isLoading) {
    return <div />; // Индикатор загрузки
  }

  if (!isLoading) {
    return (
      <Grid
        sx={{
          fontFamily: 'TTDrugsRegular',
          // width: { xs: '100%', sm: '100%', md: '80%' },
          width: '100%',
        // p: '0 0 30px 0',
        }}
      >
        {/* <h3 style={{ textAlign: 'center' }}>
        Залы и места:
      </h3> */}
        <Grid sx={{
          display: 'flex', justifyContent: 'space-between', background: '#f3f0e8', alignItems: 'center', padding: '10px',
        }}
        >
          <h4 style={{ maxWidth: '40%' }}>Залы и места</h4>
          <h4 style={{ maxWidth: '50%', textAlign: 'right' }}>
            Зал на 41 место на 1 этаже, зал на 95 мест на -1 этаже
          </h4>
        </Grid>
        <Grid sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px',
        }}
        >
          <h4 style={{ maxWidth: '40%' }}>Банкет на персону</h4>
          <h4 style={{ maxWidth: '50%', textAlign: 'right' }}>
            {table.banquetOnePerson}
            {' '}
            ₽
          </h4>
        </Grid>
        <Grid sx={{
          display: 'flex', justifyContent: 'space-between', background: '#f3f0e8', alignItems: 'center', padding: '10px',
        }}
        >
          <h4 style={{ maxWidth: '40%' }}>Фуршет на персону</h4>
          <h4 style={{ maxWidth: '50%', textAlign: 'right' }}>
            {table.furshetOnePerson}
            {' '}
            ₽
          </h4>
        </Grid>
        <Grid sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px',
        }}
        >
          <h4 style={{ maxWidth: '40%' }}>Со своим алкоголем</h4>
          <h4 style={{ maxWidth: '50%', textAlign: 'right' }}>
            Пробковый сбор:
            {' '}
            <br />
            {table.sborKrepkiyAlko}
            {' '}
            ₽/бутылка крепкий алк. до 1 л,
            {' '}
            <br />
            {table.sborSlabiyAlko}
            {' '}
            ₽/бут. не крепкий алк. до 1 л.
          </h4>
        </Grid>
        <Grid sx={{
          display: 'flex', justifyContent: 'space-between', background: '#f3f0e8', alignItems: 'center', padding: '10px',
        }}
        >
          <h4 style={{ maxWidth: '40%' }}>Стоимость закрытия</h4>
          <h4 style={{ maxWidth: '50%', textAlign: 'right' }}>
            Полное закрытие ресторана от
            {' '}
            <br />
            {formatNumber(table.polnoeZakritie)}
            {' '}
            ₽, закрытие зала на 1 этаже
            {' '}
            <br />
            {formatNumber(table.zakritieVerh)}
            {' '}
            ₽, закрытие зала на -1 этаже
            {' '}
            <br />
            {formatNumber(table.zakritieNiz)}
            {' '}
            ₽.
          </h4>
        </Grid>
        <Grid sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px',
        }}
        >
          <h4 style={{ maxWidth: '40%' }}>Предоставляемое оборудование</h4>
          <h4 style={{ maxWidth: '50%', textAlign: 'right' }}>Экран/Проектор, звуковое оборудование, световое оборудование</h4>
        </Grid>
        <Grid sx={{
          display: 'flex', justifyContent: 'space-between', background: '#f3f0e8', alignItems: 'center', padding: '10px',
        }}
        >
          <h4 style={{ maxWidth: '40%' }}>Условия</h4>
          <h4 style={{ maxWidth: '50%', textAlign: 'right' }}>Предоплата 50 % за 5 дней до мероприятия</h4>
        </Grid>
      </Grid>
    );
  }
}
