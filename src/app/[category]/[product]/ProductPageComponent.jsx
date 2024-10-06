'use client';

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useUnit } from 'effector-react';
import { useSearchParams, usePathname } from 'next/navigation';
import {
  addItem, incrementItem, decrementItem, cartStore,
} from '../../_components/store/cartStore';
import {
  addToCompare, removeFromCompare, compareStore,
} from '../../_components/store/compareStore';
import { fetchProductsFx, productsStore } from '../../_components/store/store';
import TableForProducts from '../../_components/tables/TableForProducts';

import './productPageComponent.css';

function MyButton({ product, onClick, text }) {
  return (
    <Button
      variant="outlined"
      onClick={() => onClick(product)}
      sx={{
        fontFamily: 'TTDrugs-Bold',
        fontSize: '12px',
        color: '#3c3b34',
        width: '200px',
        height: '32px',
        borderRadius: '50%',
        border: '1px solid #3c3b34',
        margin: '5px',
        '&:hover': {
          color: '#ffffff',
          backgroundColor: '#3c3b34',
          border: '0.1px solid #3c3b34',
        },
      }}
    >
      {text}
    </Button>
  );
}

function ButtonShop({ handler, symbol }) {
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={handler}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        fontFamily: 'TTDrugsRegular',
        fontSize: '30px',
        background: '#3c3b34',
        minWidth: '26px',
        width: '30px',
        height: '30px',
        padding: '5px 0 0 1px',
        border: '2px solid white',
        borderRadius: '50%',
        color: 'white',
        lineHeight: '0px',
        '&:hover': {
          color: '#3c3b34',
          backgroundColor: 'white',
          border: '2px solid #3c3b34',
        },
      }}
    >
      {symbol}
    </Button>
  );
}

export default function ProductPageComponent() {
  const [searchParams] = useSearchParams();
  const path = usePathname();
  const pathname = path.split('/')[path.split('/').length - 1];

  const products = useUnit(productsStore);
  const cart = useUnit(cartStore);
  const compareList = useUnit(compareStore);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProductsFx();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter((prod) => prod.attributes.link === pathname);
      setFilteredProducts(filtered);
    }
  }, [products]);

  const handleAddToCart = (product) => {
    addItem({ product });
  };

  const findProductInCart = (productId) => {
    const item = cart.find((cartItem) => cartItem.product.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCompare = (product) => {
    addToCompare(product);
  };

  const handleRemoveFromCompare = (productId) => {
    removeFromCompare(productId);
  };

  const findProductInCompare = (productId) => compareList.some(({ id }) => id === productId);

  if (filteredProducts.length > 0) {
    const product = filteredProducts[0];
    const imageUrl = product.attributes.prodimg2.data.attributes.url;
    const inCartQuantity = findProductInCart(product.id);
    const canShop = product.attributes.shopit;

    let content;

    if (canShop) {
      if (inCartQuantity > 0) {
        // Отображение контролов количества
        content = (
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              m: '10px 5px 5px 5px',
            }}
          >
            <ButtonShop symbol="-" handler={() => decrementItem(product.id)} />
            <TextField
              inputProps={{
                min: 0,
                max: 99999,
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
              id="outlined-number"
              type="text"
              value={inCartQuantity}
              InputLabelProps={{
                shrink: true,
              }}
              disabled
              sx={{
                textAlign: 'center',
                width: '50px',
                height: '30px',
                p: 0,
                m: '2px 10px 0 10px',
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
            <ButtonShop symbol="+" handler={() => incrementItem(product.id)} />
          </Grid>
        );
      } else {
        // Отображение кнопки "заказать"
        content = (
          <Grid
            sx={{
              width: '100%',
              height: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="outlined"
              onClick={() => handleAddToCart(product)}
              sx={{
                fontFamily: 'TTDrugs-Bold',
                fontSize: '16px',
                color: '#3c3b34',
                width: '270px',
                height: '32px',
                border: 'none',
                margin: '10px 0 0 0',
                padding: '0px',
                '&:hover': {
                  color: 'green',
                  background: 'none',
                  border: 'none',
                },
              }}
            >
              {product.attributes.price}
              {' '}
              ₽ |
              <span
                style={{
                  marginLeft: '4px',
                  background: '#d1cdbe',
                  padding: '2px 8px',
                  borderRadius: '12px',
                }}
              >
                ● заказать
              </span>
            </Button>
          </Grid>
        );
      }
    } else {
      // Отображение сообщения "Только в ресторане"
      content = (
        <Grid
          sx={{
            fontFamily: 'TTDrugs-Bold',
            fontSize: { xs: '14px', sm: '16px', md: '16px' },
            color: '#3c3b34',
            width: '100%',
            height: '32px',
            border: 'none',
            margin: '10px 0 0 0',
            textAlign: 'center',
          }}
        >
          {product.attributes.price}
          {' '}
          ₽ |
          <span
            style={{
              marginLeft: '4px',
              color: 'red',
            }}
          >
            ● ТОЛЬКО В РЕСТОРАНЕ
          </span>
        </Grid>
      );
    }

    return (
      <Box
        sx={{
          width: 'calc(100vw - 18px)',
          flexGrow: 1,
          background: '#e9e6da',
          paddingTop: '55px',
          color: '#3c3b34',
          borderBottom: '1px solid black',
          borderLeft: '1px solid black',
          borderRight: '1px solid black',
          borderRadius: '10px 10px',
        }}
      >
        <Grid
          sx={{
            height: '15px',
          }}
        />
        <Typography
          sx={{
            fontFamily: 'Cormorant-Bold',
            fontSize: {
              md: 'calc(13px + (63 - 13) * ((100vw - 300px) / (1200 - 300)))',
              xs: 'calc(26px + (135 - 26) * ((100vw - 300px) / (1200 - 300)))',
            },
            m: '20px 0 0 0',
            textAlign: 'center',
            p: '20px 0 0 0',
            background: 'none',
          }}
          variant="h1"
          component="h1"
          gutterBottom
        >
          {product.attributes.prodname}
        </Typography>

        {/* Отображение контента на основе условия */}
        {content}

        <Typography
          sx={{
            fontFamily: 'Cormorant-LightItalic',
            fontSize: {
              md: 'calc(13px + (30 - 13) * ((100vw - 300px) / (1200 - 300)))',
              xs: 'calc(26px + (60 - 26) * ((100vw - 300px) / (1200 - 300)))',
            },
            m: '10px 0 20px 0',
            textAlign: 'center',
            background: 'none',
          }}
          variant="h2"
          component="h2"
          gutterBottom
        >
          {product.attributes.description}
        </Typography>

        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: '30px',
          }}
        >
          {findProductInCompare(product.id) ? (
            <Link style={{ textDecoration: 'none' }} href="/sravnitelnaya-tablica">
              <Button
                variant="outlined"
                sx={{
                  fontFamily: 'TTDrugs-Bold',
                  fontSize: '12px',
                  color: '#3c3b34',
                  width: '200px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid #3c3b34',
                  margin: '5px',
                  '&:hover': {
                    color: '#ffffff',
                    backgroundColor: '#3c3b34',
                    border: '0.1px solid #3c3b34',
                  },
                }}
              >
                К сравнению
              </Button>
            </Link>
          ) : (
            <MyButton
              product={product}
              onClick={() => handleAddToCompare(product)}
              text="Сравнить"
            />
          )}
        </Grid>

        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'start',
            }}
          >
            <Box
              sx={{
                width: '90%',
                aspectRatio: '1100 / 1380',
                overflow: 'hidden',
                border: '3px solid #3c3b34',
                borderRadius: '15px',
              }}
            >
              <img
                src={`http://localhost:1337${imageUrl}`}
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                }}
                alt=""
              />
            </Box>
          </Grid>

          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontWeight: 100,
              textAlign: 'center',
              justifyContent: 'start',
              padding: { xs: '15px !important', sm: '35px !important', md: '0 35px 35px 35px !important' },
            }}
            item
            xs={12}
            sm={12}
            md={6}
          >
            <Typography
              sx={{
                fontFamily: 'Cormorant-LightItalic',
                fontSize: {
                  md: '2.3vw',
                  sm: '3.6vw',
                  xs: '6.6vw',
                },
                lineHeight: '100%',
                textAlign: 'left',
              }}
              variant="h2"
              component="h2"
              gutterBottom
            >
              {product.attributes.product_article.split('\n').map((word, index) => (
                <React.Fragment key={index}>
                  {word}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          sx={{
            p: { xs: '0 10px 10px 10px', sm: '0 50px 10px 50px', md: '0 100px 10px 100px' },
            marginTop: { xs: '15px', sm: '45px' },
          }}
        >
          <TableForProducts product={product.attributes} />
        </Grid>
      </Box>
    );
  }

  return null;
}
