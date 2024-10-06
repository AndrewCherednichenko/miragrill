'use client';

import * as React from 'react';
import { useUnit } from 'effector-react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import '../_components/css/fonts.css';

import { addToCompare, removeFromCompare, compareStore } from '../_components/store/compareStore';

const columns = [
  {
    id: 'menu', label: 'Пункт меню', minWidth: 170,
  },
  {
    id: 'protein', label: 'Белки', minWidth: 100, width: 100, align: 'center',
  },
  {
    id: 'fat',
    label: 'Жиры',
    width: 100,
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'carbonate',
    label: 'Углеводы',
    width: 100,
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'ccal',
    label: 'кКалл\n(на 100 гр)',
    width: 100,
    minWidth: 100,
    align: 'center',
    format: (value) => value,
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'portion',
    label: 'Порция',
    width: 100,
    minWidth: 100,
    align: 'center',
    format: (value) => value,
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'ccalPortion',
    label: 'кКалл\n(на порцию)',
    width: 100,
    minWidth: 100,
    align: 'center',
    format: (value) => value,
    // format: (value) => value.toFixed(2),
  },
];

function createData(id, menu, protein, fat, carbonate, ccal, portion) {
  const ccalPortion = (ccal * portion) / 100;
  return {
    id, menu, protein, fat, carbonate, ccal, portion, ccalPortion,
  };
}

export default function ComparisonTable() {
  const compareList = useUnit(compareStore); // стор таблицы
  const rows = compareList.map((item) => createData(
    item.attributes.id,
    item.attributes.prodname,
    item.attributes.protein,
    item.attributes.fat,
    item.attributes.ugli,
    item.attributes.calories,
    item.attributes.weight,
  ));

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const ccalPortionSum = rows.reduce((sum, row) => sum + row.ccalPortion, 0);

  // Использование React.useEffect для условного рендеринга на клиентской стороне
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    rows.length > 0 ? (
      <Paper
        sx={{
          width: 'calc(100vw - 18px)',
          margin: '0',
          // background: '#e0ddcf', //
          background: '#e9e6da',
          border: '1px solid #3c3b34',
          boxShadow: 'none',
          borderRadius: '0 0 10px 10px',
          // overflow: 'auto',
        // fontFamily: 'TTDrugs-Bold',
        }}
      >
        <TableContainer
          sx={{
            height: { xs: 'calc(100vh - 110px)', sm: 'calc(100vh - 110px)', md: 'calc(100vh - 140px)' },
            '&::-webkit-scrollbar': {
              display: 'none', // скрыть скроллбар для WebKit-браузеров
            },
            msOverflowStyle: 'none', // скрыть скроллбар для Internet Explorer 10+
            // overflowX: 'hidden', // скрыть горизонтальный скроллбар
          }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            // sx={{ height: '100vh' }}
          >
            <TableHead>
              <TableRow sx={{ position: 'sticky', top: 0, zIndex: 100 }}>
                {columns.map((column, index) => (
                  <TableCell
                    sx={{
                      ...(index === 0
                        ? { // применяем стили только к первому элементу
                          position: 'sticky',
                          left: 0,
                          top: 0,
                          // backgroundColor: 'white', // добавляем фон для залипания
                          background: '#e0ddcf',
                          zIndex: 100, // повышаем zIndex для корректного отображения
                        }
                        : { // применяем стили ко всем элементам, кроме первого
                          position: 'sticky',
                          top: 0,
                          zIndex: 90,
                          background: '#e0ddcf',
                        }),
                    }}
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      whiteSpace: 'pre',
                      fontFamily: 'TTDrugs-Bold',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column, colIndex) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          sx={{
                            fontFamily: 'TTDrugs-Bold',
                            ...(colIndex === 0 && {
                              position: 'sticky',
                              left: 0,
                              // background: 'white',
                              background: '#e9e6da', /// /
                              // fontFamily: 'TTDrugs-Bold',
                            }),
                          }}
                          key={column.id}
                          align={column.align}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'TTDrugs-Bold',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 'calc(100% - 18px)',
                      // margin: '0 8px',
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bottom: '49px',
                      background: '#e0ddcf',
                      p: '10px 0 0 0',
                      borderTop: '1px solid #3c3b34',
                      // background: '#e0ddcf',
                    }}
                  >
                    Всего каллорий:
                    {' '}
                    {ccalPortionSum}
                    {/* {ccalPortionSum.toFixed(2)} */}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="строк на странице"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count !== -1 ? count : `more than ${to}`}`}
          sx={{
            borderRadius: '0 0 10px 10px',
            // borderTop: '1px solid black',
            fontFamily: 'TTDrugs-Bold',
            background: '#e0ddcf',
            '& .MuiTablePagination-selectLabel': {
              fontFamily: 'TTDrugs-Bold',
            },
            '& .MuiTablePagination-displayedRows': {
              fontFamily: 'TTDrugs-Bold',
            },
            '& .MuiTablePagination-select': {
              fontFamily: 'TTDrugs-Bold',
            },
          }}
        />
      </Paper>
    ) : (
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          // p: 5,
          width: 'calc(100vw - 18px)',
          // maxWidth: 'calc(100% - 18px)',
          margin: '0',
          // background: '#e0ddcf', //
          background: '#e9e6da',
          border: '1px solid #3c3b34',
          boxShadow: 'none',
          borderRadius: '0 0 10px 10px',
          // overflow: 'auto',
          fontFamily: 'TTDrugs-Bold',
          height: { xs: 'calc(100vh - 52px)', sm: 'calc(100vh - 52px)', md: 'calc(100vh - 82px)' },
        }}
      >
        <h1 style={{ margin: '20px' }}>Вы еще не добавили ни одного пункта меню</h1>
      </Paper>
    )
  );
}
