import Head from 'next/head';
import React from 'react';
import Grid from '@mui/material/Grid';
import Navbar from '../_components/main/Navbar';
import ComparisonTable from './ComparisonTable';
import './sravnitelnaya.css';

export default function SravnitelnayaTablica() {
  return (
    <>
      <Head>
        <title>Ваш заголовок страницы</title>
        <meta name="description" content="Описание вашей страницы" />
        <meta name="keywords" content="ключевые, слова, вашего, сайта" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Дополнительные мета-теги и ссылки на внешние ресурсы */}
      </Head>
      {/* Тут можно добавить общие компоненты, например, Header или Footer */}
      <main>
        <Navbar />
        <Grid sx={{
          background: 'white',
          // width: 'calc(100vw-16px)',
          height: { xs: '50px', sm: '50px', md: '70px' },
        }}
        />
        <ComparisonTable />
      </main>
      {/* Подвал сайта, если нужен */}
    </>
  );
}
