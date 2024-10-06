// import BanketniiZal from './_components/main/BanketniiZal';

import Navbar from '../_components/main/Navbar';
import MenuPage from '../_components/main/MenuPage';
import Contacts from '../_components/main/Contacts';

export default function Home() {
  return (
    <>
      {/* <div>MainPage</div> */}
      <Navbar />
      <div style={{
        // position: 'fixed',
        background: 'white',
        width: '100%',
        height: '50px',
        // zIndex: 1000,
      }}
      />
      {/* <MenuPage /> */}
      <Contacts />
    </>
  );
}
