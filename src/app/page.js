// import BanketniiZal from './_components/main/BanketniiZal';

import Navbar from './_components/main/Navbar';
import Main from './_components/main/Main';
import MainFormula from './_components/main/MainFormula';
import OsnovnoyZal from './_components/main/OsnovnoyZal';
import BanketniiZal from './_components/main/BanketniiZal';
import Menu from './_components/main/Menu';
import Zabronirovat from './_components/main/Zabronirovat';
import Delivery from './_components/main/Delivery';
import Contacts from './_components/main/Contacts';

export default function Home() {
  return (
    <>
      {/* <div>MainPage</div> */}
      <Navbar />
      {/* <div style={{
        background: 'white', width: '100vw', height: '50px',
      }}
      /> */}
      <Main />
      <MainFormula />
      <OsnovnoyZal />
      <BanketniiZal />
      <Menu />
      <Zabronirovat />
      <Delivery />
      <Contacts />
    </>
  );
}
