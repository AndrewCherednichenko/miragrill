// import BanketniiZal from './_components/main/BanketniiZal';

import CategoryPageComponent from './CategoryPageComponent';
import Navbar from '../_components/main/Navbar';
import CartButton from '../_components/buttons/CartButton';

export default function CategoryPage() {
  return (
    <>
      {/* <div>MainPage</div> */}
      <Navbar />
      {/* <div style={{
        background: 'white', width: '100vw', height: '50px',
      }}
      /> */}
      <CategoryPageComponent />
      {/* <CartButton /> */}
    </>
  );
}
