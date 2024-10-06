'use client';

import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useUnit } from 'effector-react';
import { useSearchParams, usePathname } from 'next/navigation';
import {
  addItem, incrementItem, decrementItem, removeItem, cartStore,
} from '../_components/store/cartStore';
import {
  addToCompare, removeFromCompare, compareStore,
} from '../_components/store/compareStore';
import {
  fetchProductsFx, productsStore,
} from '../_components/store/store';
import ProductItem from './ProductItem';
import ButtonShop from './ButtonShop';

import './categoryPage.css';

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

function MyButtonOrder({ product, onClick }) {
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
        border: 'none',
        margin: '5px',
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
  );
}

function CategoryPageComponent() {
  const [searchParams] = useSearchParams();
  const pathname = usePathname().replace('/', '');
  const products = useUnit(productsStore);
  const cart = useUnit(cartStore);
  const compareList = useUnit(compareStore);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [activeSubcat, setActiveSubcat] = useState('');
  const [manualScroll, setManualScroll] = useState(false);
  const subcategoryRefs = useRef({});
  const menuRef = useRef(null);

  useEffect(() => {
    fetchProductsFx();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter((prod) => prod.attributes.category.data.attributes.link === pathname);
      setFilteredProducts(filtered);

      if (filtered.length > 0) {
        setCategoryName(filtered[0].attributes.category.data.attributes.catname);
      }
    }
  }, [products, pathname]);

  const subcategories = Array.from(new Set(filteredProducts.map((product) => {
    const subcategory = product.attributes.subcategory.data.attributes;
    return `${subcategory.subcat_name}-${subcategory.subcat_rank}`;
  }))).map((item) => {
    const [subcatName, subcatRank] = item.split('-');
    return { subcatName, subcatRank: Number(subcatRank) };
  }).sort((a, b) => a.subcatRank - b.subcatRank);

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

  const findProductInCompare = (productId) => {
    if (Array.isArray(compareList)) {
      return compareList.some(({ id }) => id === productId);
    }
    console.error('compareList is not an array:', compareList);
    return false;
  };

  const setSubcategoryRef = (subcatName, el) => {
    subcategoryRefs.current[subcatName] = el;
  };

  const scrollToSubcategory = useCallback((subcatName) => {
    setManualScroll(true);
    const ref = subcategoryRefs.current[subcatName];
    if (ref && typeof window !== 'undefined') {
      const menuHeight = menuRef.current ? menuRef.current.getBoundingClientRect().height : 0;
      const elementTop = ref.getBoundingClientRect().top;
      const offsetPosition = elementTop + window.scrollY - menuHeight - 65;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSubcat(subcatName);
      setTimeout(() => setManualScroll(false), 1000); // Adjust the delay as needed
    }
  }, []);

  const handleIntersection = useCallback((entries) => {
    if (manualScroll) return;
    const visibleEntries = entries.filter((entry) => entry.isIntersecting);
    if (visibleEntries.length > 0) {
      const entry = visibleEntries.reduce((prev, current) => ((prev.intersectionRatio > current.intersectionRatio) ? prev : current));
      setActiveSubcat(entry.target.id);
    }
  }, [manualScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px 0px -50% 0px',
      threshold: [0, 1],
    });

    const currentObserver = observer;

    Object.values(subcategoryRefs.current).forEach((ref) => {
      if (ref) {
        currentObserver.observe(ref);
      }
    });

    return () => {
      if (currentObserver) {
        Object.values(subcategoryRefs.current).forEach((ref) => {
          if (ref) {
            currentObserver.unobserve(ref);
          }
        });
      }
    };
  }, [filteredProducts, handleIntersection]);

  // useEffect(() => {
  //   console.log('Active subcategory:', activeSubcat);
  // }, [activeSubcat]);

  const handleTabChange = (event, newValue) => {
    if (newValue !== -1) {
      const newSubcat = subcategories[newValue].subcatName;
      scrollToSubcategory(newSubcat);
    }
  };

  return (
    <Box
      sx={{
        background: '#e0ddcf',
        marginTop: '-15px',
        color: '#3c3b34',
        border: '1px solid black',
        borderRadius: '10px 10px',
      }}
    >
      <h1
        style={{
          marginTop: '150px',
          fontFamily: 'Cormorant-Medium',
          fontSize: '50px',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        {categoryName}
      </h1>

      {/* Меню субкатегорий */}
      <Box
        ref={menuRef}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: { xs: '58px', sm: '58px', md: '78px' },
          width: 'calc(100% - 18px)',
          background: '#e0ddcf',
          zIndex: 1000,
          padding: '10px 0',
          overflow: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        <Tabs
          value={Math.max(0, subcategories.findIndex((subcat) => subcat.subcatName === activeSubcat))}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'green',
              // backgroundColor: '#3c3b34',
            },
          }}
        >
          {subcategories.map(({ subcatName }) => (
            <Tab
              key={subcatName}
              label={subcatName}
              sx={{
                fontFamily: 'TTDrugs-Bold',
                color: activeSubcat === subcatName ? 'green !important' : '#3c3b34 !important',
                // color: activeSubcat === subcatName ? 'green' : '#3c3b34',
                // textDecoration: activeSubcat === subcatName ? 'underline' : 'none',
              }}
            />
          ))}
        </Tabs>
      </Box>

      {subcategories.map(({ subcatName }) => (
        <div key={subcatName} id={subcatName} ref={(el) => setSubcategoryRef(subcatName, el)}>
          <div style={{
            width: '100%', paddingBottom: '30px', display: 'flex', justifyContent: 'center',
          }}
          >
            <div style={{ width: '85%', height: '1px', background: '#3c3b34' }} />
          </div>
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              mb: 4,
            }}
          >
            {filteredProducts
              .filter((product) => product.attributes.subcategory.data.attributes.subcat_name === subcatName)
              .map((product) => {
                const quantity = findProductInCart(product.id);
                return (
                  <Grid
                    item
                    key={product.id}
                    xs={12}
                    sm={6}
                    md={4}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      m: '20px 0',
                    }}
                  >
                    <Link
                      style={{
                        textDecoration: 'none',
                        color: '#3c3b34',
                      }}
                      href={`${pathname}/${product.attributes.link}`}
                    >
                      <ProductItem product={product} />
                    </Link>
                    <Grid
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      {product.attributes.shopit ? (
                        <>
                          {quantity > 0 && (
                            <Grid
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                m: '5px',
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
                          )}
                          {quantity === 0 && (
                            <MyButtonOrder product={product} onClick={handleAddToCart} />
                          )}
                        </>
                      ) : (
                        <Grid
                          variant="outlined"
                          // onClick={() => onClick(product)}
                          sx={{
                            fontFamily: 'TTDrugs-Bold',
                            fontSize: '12px',
                            color: '#3c3b34',
                            width: '220px',
                            height: '32px',
                            border: 'none',
                            margin: '15px 0 -5px 0',
                          }}
                        >
                          {product.attributes.price}
                          {' '}
                          ₽ |
                          <span
                            style={{
                              marginLeft: '4px',
                              // background: '#d1cdbe',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              color: 'red',
                            }}
                          >
                            ● ТОЛЬКО В РЕСТОРАНЕ
                          </span>
                        </Grid>
                      )}
                      {findProductInCompare(product.id) ? (
                      // <a href="http://localhost:3000/sravnitelnaya-tablica" aria-label="Перейти к сравнению">
                        <Link style={{ textDecoration: 'none' }} href="/sravnitelnaya-tablica">
                          <Button
                            variant="outlined"
                            // onClick={() => onClick(product)}
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
                      // </a>
                      ) : (
                        <MyButton
                          product={product}
                          onClick={() => handleAddToCompare(product)}
                          text="Сравнить"
                        />
                      )}
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
        </div>
      ))}
    </Box>
  );
}

export default CategoryPageComponent;
