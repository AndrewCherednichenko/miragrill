// import BanketniiZal from './_components/main/BanketniiZal';

import Navbar from '../_components/main/Navbar';
import Banketi from './Banketi';

export default function Home() {
  return (
    <>
      {/* <div>MainPage</div> */}
      <Navbar />
      {/* <div style={{
        background: 'white', width: '100vw', height: '50px',
      }}
      /> */}
      <Banketi />
    </>
  );
}
