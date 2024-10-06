'use client';

import * as React from 'react';
import { useUnit } from 'effector-react';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import Link from 'next/link';
// import { useTheme } from '@mui/material/styles';
import { categoriesStore, fetchCategoriesFx } from '../store/store';

import './fonts.css';
import CartButton from '../buttons/CartButton';
import ReserveModal from '../modals/ReserveModal';
import PhoneIconNavbar from '../buttons/PhoneIconNavbar';

// const pages = ['Меню', 'Интерьер', 'Банкеты', 'Караоке', 'Забронировать', 'Контакты'];
const pages = [
  { name: 'Меню', link: '/menu', submenu: true },
  { name: 'Интерьер', link: '/interior' },
  { name: 'Банкеты', link: '/banketi' },
  { name: 'Караоке', link: '/karaoke' },
  { name: 'Забронировать', link: '/reserv' },
  { name: 'Контакты', link: '/contacts' },
];

export default function Navbar() {
  // const theme = useTheme();

  React.useEffect(() => {
    fetchCategoriesFx(); // Функция загрузки данных категорий
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [openReserveModal, setOpenReserveModal] = React.useState(false);
  const categories = useUnit(categoriesStore);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleMenuClick = (event) => setMenuAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setMenuAnchorEl(null);

  const handleOpenReserveModal = () => setOpenReserveModal(true);
  const handleCloseReserveModal = () => setOpenReserveModal(false);

  return (
    <div style={{ position: 'relative' }}>
      <div
        className="NavDiv"
        style={{
          position: 'fixed',
          top: '0px',
          background: 'white',
          width: '100vw',
          height: '50px',
          zIndex: 100,
        }}
      />
      <AppBar
        position="fixed"
        sx={{
          background: '#f4f2eb',
          color: '#3c3b34',
          boxShadow: 'none',
          height: { xs: '66px', sm: '66px', md: '83px' },
          margin: '0 8px 0 8px', // Отступы с левой и правой стороны
          width: 'calc(100% - 16px)', // Вычитаем отступы с обеих сторон из 100%
          maxWidth: 'calc(100% - 16px)', // Максимальная ширина для центрирования содержимого
          border: '1px solid #3c3b34',
          borderRadius: '10px 10px 0 0',
        //   padding: '0px !important',
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            padding: {
              xs: '0px 0px 0px 5px !important',
              sm: '0px 5px !important',
              md: '10px 5px 5px 5px !important',
            },
            height: '64px',
          }}
        >
          <Toolbar disableGutters sx={{ height: '64px' }}>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    sx={{ fontFamily: 'TTDrugs-Bold', color: '#3c3b34' }}
                    key={page.name}
                    onClick={
                    page.name === 'Забронировать'
                      ? handleOpenReserveModal
                      : handleCloseNavMenu
                  }
                  >
                    {page.name === 'Забронировать' ? (
                      <Typography textAlign="center">{page.name}</Typography>
                    ) : (
                      <Link
                        style={{
                          fontFamily: 'TTDrugs-Bold',
                          color: '#3c3b34',
                          textDecoration: 'none',
                        }}
                        href={page.link}
                      >
                        <Typography textAlign="center">{page.name}</Typography>
                      </Link>
                    )}
                  </MenuItem>
                ))}
                {/* <ReserveModal /> */}
              </Menu>
            </Box>

            {/* меню которое нужно сместить */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'end',
                width: '100%',
              }}
            >
              {pages.map((page, index) => {
                const keyBase = `${page.name}-${index}`;
                return page.submenu !== true ? (
                  <Button
                    key={keyBase}
                    onClick={
        page.name === 'Забронировать'
          ? handleOpenReserveModal
          : handleCloseNavMenu
      }
                    sx={{
                      my: 2,
                      minWidth: '25px',
                      margin: '38px 10px 0px 10px',
                      color: '#3c3b34',
                      display: 'block',
                      fontFamily: 'TTDrugsRegular',
                      textTransform: 'none',
                      fontSize: '16px',
                      padding: 0,
                    }}
                  >
                    {page.name === 'Забронировать' ? (
                      <span
                        style={{
                          color: '#3c3b34',
                          textDecoration: 'none',
                        }}
                      >
                        {page.name}
                      </span>
                    ) : (
                      <Link
                        style={{
                          color: '#3c3b34',
                          textDecoration: 'none',
                        }}
                        href={page.link}
                      >
                        {page.name}
                      </Link>
                    )}
                  </Button>
                ) : (
                  <div key={keyBase}>
                    <Button
                      onClick={handleMenuClick}
                      sx={{
                        my: 2,
                        minWidth: '25px',
                        margin: '38px 10px 0px 10px',
                        color: '#3c3b34',
                        display: 'block',
                        fontFamily: 'TTDrugsRegular',
                        textTransform: 'none',
                        fontSize: '16px',
                        padding: 0,
                      }}
                    >
                      {page.name}
                    </Button>
                    <Menu
                      anchorEl={menuAnchorEl}
                      open={Boolean(menuAnchorEl)}
                      onClose={handleCloseMenu}
                      MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} onClick={handleCloseMenu}>
                          <Link href={`/${category.attributes.link}`} style={{ textDecoration: 'none', color: '#3c3b34' }}>
                            <Typography textAlign="center">{category.attributes.catname}</Typography>
                          </Link>
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                );
              })}

              {/* <ReserveModal /> */}

            </Box>

            {/* <Grid sx={{ width: '100%', height: { xs: '20px', sm: '1px' } }} /> */}
            <Link
              href="/"
              style={{
                margin: '0px 0px 48px 0px', // стандартный отступ для больших экранов
                // [theme.breakpoints.down('sm')]: {
                //   margin: '0px 0px 28px 0px', // отступ для экранов меньше 900px
                // },
              }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  margin: { xs: '9px 0px 28px 0px', sm: '9px 0px 28px 0px', md: '0px 0px 28px 0px' },
                  position: 'absolute',
                  left: { xs: '47%', sm: '50%' },
                  transform: 'translateX(-50%)',
                  fontFamily: 'MADECanvas',
                  letterSpacing: '.1rem',
                  color: '#3c3b34',
                  textDecoration: 'none',
                }}
              >
                MIRAGRILL
              </Typography>
            </Link>
            {/* </Grid> */}

            <Box
              sx={{
                flexGrow: 0,
                display: 'flex',
              }}
            >
              {/* <Link style={{ marginRight: '25px' }} href="tel:123456789">
                <img style={{ height: '28px' }} src="/images/phone-icon.png" alt="" />
              </Link>
              <Link style={{ marginRight: '25px' }} href="tel:123456789">
                <img style={{ height: '28px' }} src="/images/cart-icon.png" alt="" />
              </Link> */}
              <PhoneIconNavbar />
              {/* <a
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '35px',
                  height: '35px',
                  // marginRight: '12px',
                }}
                href="tel:123456789"
                aria-label="Позвонить в реторан Мирагриль"
              >
                <img style={{ height: '28px' }} src="/images/phone-icon.png" alt="" />
              </a> */}
              <CartButton />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ReserveModal
        open={openReserveModal}
        onClose={handleCloseReserveModal}
        title="забронировать стол"
      />
    </div>
  );
}
