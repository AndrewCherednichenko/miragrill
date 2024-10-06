'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Box from '@mui/joy/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/joy/Button';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import { useUnit } from 'effector-react';
import {
  addItem, incrementItem, decrementItem, removeItem, cartStore,
} from '../store/cartStore';
import GoodInCart from '../cart/GoodInCart';
import CartModal from '../modals/CartModal';

export default function CartButton() {
  const [open, setOpen] = React.useState(false);
  const cart = useUnit(cartStore);
  // console.log(cart.length);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Функция для увеличения количества товара в корзине
  const handleIncrement = (productId) => {
    incrementItem(productId);
  };

  // Функция для уменьшения количества товара в корзине
  const handleDecrement = (productId) => {
    decrementItem(productId);
  };

  // Функция для удаления товара из корзины
  const handleRemove = (productId) => {
    removeItem(productId);
  };

  const allPrice = cart.reduce(
    (accumulator, currentValue) => accumulator + (currentValue.product.attributes.price * currentValue.quantity),
    0,
  );

  return (
    <>
      {mounted && (
      <>
        <Badge
          sx={{
            left: '27px',
            top: '2px',
            '& .MuiBadge-badge': {
              backgroundColor: '#3c3b34',
              color: '#fff', // Цвет текста бэйджа
            },
          }}
          badgeContent={cart.length}
        />
        <a
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '35px',
            height: '35px',
            marginRight: '5px',
            cursor: 'pointer',
          }}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setOpen(true);
            }
          }}
          role="button"
          tabIndex="0"
          aria-label="Открыть корзину"
        >
          <img style={{ height: '28px' }} src="/images/cart-icon.png" alt="Cart icon" />
        </a>
      </>
      )}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiDrawer-content': {
            maxWidth: '300px',
            display: 'flex',
            justifyContent: 'center',
            background: '#f3f0e8',
          },
        }}
      >
        {/* <Box sx={{ backgroundColor: 'red', height: '100%', width: '100%' }}> */}
        <ModalClose />
        <DialogTitle>Ваш заказ</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {cart.length !== 0 ? (
            cart.map((item) => (
              // <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={item.product.id}>
              <GoodInCart key={item.product.id} item={item} />
              // </Grid>
            ))
          ) : (
            <h2
              style={{
                textAlign: 'center',
                margin: 'auto',
                color: '#3c3b34',
              }}
            >
              В вашей корзине еще ничего нет
            </h2>
          )}

        </DialogContent>
        {cart.length !== 0 ? (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              p: 2,
              // padding: '0 15px',
              pb: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3 style={{ margin: '0 0 14px 0', fontFamily: 'TTDrugs-Bold' }}>
                Сумма:
                {' '}
                {cart.reduce(
                  (accumulator, currentValue) => accumulator + (currentValue.product.attributes.price * currentValue.quantity),
                  0,
                )}
                {' '}
                ₽
              </h3>
              <CartModal allPrice={allPrice} />
            </div>
          </Box>
        ) : (
          <div />
        )}

      </Drawer>
    </>
  );
}
