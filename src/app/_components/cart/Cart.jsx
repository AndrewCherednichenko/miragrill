// import * as React from 'react';
// import { useStore } from 'effector-react';
// import Avatar from '@mui/joy/Avatar';
// import Box from '@mui/joy/Box';
// import Button from '@mui/joy/Button';
// import Drawer from '@mui/joy/Drawer';
// import DialogTitle from '@mui/joy/DialogTitle';
// import DialogContent from '@mui/joy/DialogContent';
// import List from '@mui/joy/List';
// import ListItem from '@mui/joy/ListItem';
// import ListItemButton from '@mui/joy/ListItemButton';
// import Typography from '@mui/joy/Typography';
// import ModalClose from '@mui/joy/ModalClose';
// import IconButton from '@mui/material/IconButton';
// import ShoppingCartCheckoutSharpIcon from '@mui/icons-material/ShoppingCartCheckoutSharp';
// import Badge from '@mui/material/Badge';
// import Tooltip from '@mui/material/Tooltip';

// import GoodCardInCart from './GoodCardInCart';
// import ByInCartModal from '../Modals/ByInCartModal';

// import {
//   // cartStateStore,
//   // updateCartState,
//   currentValueStore,
//   updateCurrentValue,
//   removeItem,
// } from '../store/effectorStore';

// export default function CartNew() {
//   const valueStore = useStore(currentValueStore);
//   const fullPrice = valueStore.reduce((acc, current) => acc += current[0].price * current[1], 0);
//   // console.log(fullPrice);
//   const [open, setOpen] = React.useState(false);

//   return (
//     <>
//       <Tooltip
//         sx={{}}
//         placement="bottom"
//         title="корзина"
//         arrow
//       >
//         <IconButton
//           onClick={() => setOpen(true)}
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             color: 'black',
//             padding: '0px',
//             ml: 2,
//             '&:hover': {
//               background: 'none',
//               border: 'none',
//             },
//           }}
//           color="black"
//         >
//           <Badge badgeContent={valueStore.length > 0 ? valueStore.length : null} color="info">
//             <ShoppingCartCheckoutSharpIcon
//               fontSize="large"
//               sx={{
//                 color: 'black',
//               // ml: 2,
//               }}
//             />
//           </Badge>
//         </IconButton>
//       </Tooltip>

//       <Drawer
//         anchor="right"
//         open={open}
//         onClose={() => setOpen(false)}
//         sx={{
//           position: 'relative',
//           zIndex: 3001,
//           // padding: '10px',
//         }}
//       >

//         <ModalClose />
//         <DialogTitle>Ваши покупки</DialogTitle>
//         <DialogContent>
//           {/* <GoodCardInCart /> */}
//           <List sx={{ paddingLeft: '0px' }}>
//             {valueStore.length === 0 ? (
//               <h2 style={{
//                 height: '90%', display: 'flex', alignItems: 'center', textAlign: 'center',
//               }}
//               >
//                 Вы ещё не добавили ни одного товра
//               </h2>
//             ) : (

//               valueStore.map((item) => (
//                 <GoodCardInCart key={item[0].id} item={item} />
//               ))
//             )}
//           </List>
//         </DialogContent>
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 1,
//             p: 1.5,
//             pb: 2,
//             borderTop: '1px solid',
//             borderColor: 'divider',
//           }}
//         >
//           <h2
//             style={{ lineHeight: '5px' }}
//           >
//             Итого:
//             {' '}
//             10рублей
//             {/* {fullPrice} */}
//             {' '}
//             ₽
//           </h2>

//           {/* <ByInCartModal setCloseCart={setOpen} /> */}

//         </Box>
//       </Drawer>
//     </>
//   );
// }
