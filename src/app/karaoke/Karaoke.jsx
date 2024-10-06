'use client';

import { useState, useEffect, useRef } from 'react';
import { useUnit } from 'effector-react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import ReserveModal from '../_components/modals/ReserveModal';

// import InterierUpRoom from '../modals/InterierUpRoom';

import '../_components/css/fonts.css';
import TableForKaraoke from '../_components/tables/TableForKaraoke';

import {
  fetchDataForPageFx, dataForPageStore,
} from '../_components/store/singleTypesStore';

export default function Karaoke() {
  // открытие модалки брони
  const [openReserveModal, setOpenReserveModal] = useState(false);
  const handleOpenReserveModal = () => setOpenReserveModal(true);
  const handleCloseReserveModal = () => setOpenReserveModal(false);

  // данные из стора
  const pictureData = useUnit(dataForPageStore);
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки
  const [picture, setPicture] = useState('/images/banketnii-zal.png'); // Добавляем картинку

  useEffect(() => {
    fetchDataForPageFx()
      .then(() => {
        setIsLoading(false); // Обновляем состояние загрузки после загрузки данных
      });
  }, []);

  // const imageUrl = pictureData;

  useEffect(() => {
    if (!isLoading && pictureData && pictureData.attributes && pictureData.attributes.karaoke) {
      // console.log(pictureData.attributes.karaoke.data.attributes.url);
      setPicture(pictureData.attributes.karaoke.data.attributes.url);
    }
  }, [isLoading, pictureData]);

  const [scrollY, setScrollY] = useState(0); // Инициализируем scrollY без использования window
  const imageRef = useRef(null);

  useEffect(() => {
    // Перемещаем обращение к window внутрь useEffect
    setScrollY(window.scrollY);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Функция для вычисления смещения изображения
  const calculateOffsetY = () => {
    if (imageRef.current) {
      const { top, height } = imageRef.current.getBoundingClientRect();
      if (top + height < 0) {
        return 1.29;
      } if (top > window.innerHeight) {
        return 0.71;
      }
      const progress = (window.innerHeight - top) / (window.innerHeight + height);
      return 0.71 + (progress * 0.58);
    }
    return 1;
  };

  // Вычисляем смещение для изображения
  const scale = 1.15;
  const offsetY = calculateOffsetY();

  if (isLoading) {
    return <div />; // Индикатор загрузки
  }

  if (!isLoading) {
    return (
      <Box
        id="interier"
        sx={{
          flexGrow: 1,
          // background: '#e9e6da',
          marginTop: '60px',
          color: '#3c3b34',
        }}
      >
        <Grid sx={{
          background: '#e9e6da',
          height: '15px',
          borderLeft: '1px solid black',
          borderRight: '1px solid black',
        // borderRadius: '10px',
        }}
        />
        <Grid
          container
          spacing={0}
          className="njnjn"
          sx={{
            background: '#e9e6da',
            borderBottom: '1px solid black',
            borderLeft: '1px solid black',
            borderRight: '1px solid black',
            borderRadius: '0px 0px 10px 10px',
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{
              height: '85%', width: '90%', overflow: 'hidden', border: '3px solid #3c3b34', borderRadius: '15px',
            }}
            >
              <img
                ref={imageRef}
                // src="/images/osnovnoy-zal.png"
                src={`http://localhost:1337${picture}`}
                style={{
                  transform: `scale(${scale}) translateY(${(offsetY - 1) * 100}%)`,
                  // transition: 'transform 0.5s ease-out',
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
              justifyContent: 'center',
              padding: '35px !important',
              order: { xs: -1, md: 0 },
            }}
            item
            xs={12}
            sm={12}
            md={6}
          >
            <Typography
              sx={{
                fontFamily: 'Cormorant-Bold',
                fontSize: {
                  md: 'calc(13px + (63 - 13) * ((100vw - 300px) / (1200 - 300)))',
                  xs: 'calc(26px + (135 - 26) * ((100vw - 300px) / (1200 - 300)))',
                },
                mt: '20px',
              }}
              variant="h2"
              component="h2"
              gutterBottom
            >
              КАРАОКЕ-ЗАЛ
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Cormorant-LightItalic',
                fontSize: {
                  md: 'calc(13px + (30 - 13) * ((100vw - 300px) / (1200 - 300)))',
                  xs: 'calc(24px + (60 - 24) * ((100vw - 300px) / (1200 - 300)))',
                },
                lineHeight: '100%',
              }}
              variant="h2"
              component="h2"
              gutterBottom
            >
              в ресторане Мирагриль
              <br />
              для творческих личностей
              {/* <br />
            в ресторане Мирагриль */}
            </Typography>

            {/* <InterierUpRoom /> */}
            <Button
              variant="outlined"
              onClick={handleOpenReserveModal}
              sx={{
                fontFamily: 'TTDrugs-Bold',
                fontSize: {
                  md: '9px',
                  xs: '9px',
                },
                color: '#3c3b34',
                width: '170px',
                height: '32px',
                borderRadius: '50%',
                border: '0.1px solid #3c3b34',
                margin: 0,
                mt: '8%',
                '&:hover': {
                  color: '#ffffff',
                  backgroundColor: '#3c3b34',
                  border: '0.1px solid #3c3b34',
                },
              }}
            >
              ЗАБРОНИРОВАТЬ
            </Button>
          </Grid>
          <Typography
            sx={{
              fontFamily: 'Cormorant-LightItalic',
              fontSize: {
                md: 'calc(13px + (30 - 13) * ((100vw - 300px) / (1200 - 300)))',
                xs: 'calc(24px + (60 - 24) * ((100vw - 300px) / (1200 - 300)))',
              },
              lineHeight: '100%',
              padding: '1% 10%',
            }}
            variant="h2"
            component="h2"
            gutterBottom
          >
            Добро пожаловать в наш зал караоке — место, где каждый может стать звездой!
            <br />
            <br />
            Здесь вас ждут уютная атмосфера, современное оборудование AST и огромный выбор песен для любого настроения.
            <br />
            <br />
            Соберите друзей, возьмите микрофон и наслаждайтесь любимыми хитами, создавая незабываемые моменты. В нашем караоке-зале вы сможете отпраздновать особые события или просто провести веселый вечер в компании близких.
            <br />
            <br />
            Мы позаботимся о том, чтобы ваше выступление прошло на высшем уровне, а вы получили массу положительных эмоций!
            <br />
          </Typography>
          <Grid
            sx={{
              width: '100%',
              p: { xs: '0 10px 10px 10px', sm: '0 50px 10px 50px', md: '0 50px 10px 50px' },
              marginTop: { xs: '15px', sm: '45px' },
            // width: { xs: '100%', sm: '100%', md: '80%' },
            // display: 'flex',
            // justifyContent: 'center',
            }}
          >
            <TableForKaraoke />
          </Grid>
        </Grid>

        <ReserveModal
          open={openReserveModal}
          onClose={handleCloseReserveModal}
          title="забронировать караоке"
        />

      </Box>
    );
  }
}
