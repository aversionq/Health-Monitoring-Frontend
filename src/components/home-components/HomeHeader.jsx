import logoIcon from '../../images/logo.png';
import { useState } from 'react';
import ModalAuth from './ModalAuth';

function HomeHeader() {
  const [modalActive, setModalActive] = useState(false);
  return (
    <div>
      <nav className="flex items-center justify-between bg-amber-400 sticky top-0 p-4">
        <div className="navbar__title text-3xl font-bold">HEALTHED</div>
        <div className="navbar__logo">
          <img src={logoIcon} alt="HealMe logo"></img>
        </div>
        <div className="navbar__signin text-3xl font-bold">
          <button onClick={() => setModalActive(true)}>Войти</button>
        </div>
      </nav>
      <ModalAuth active={modalActive} setActive={setModalActive} />
    </div>
  );
}

export default HomeHeader;
