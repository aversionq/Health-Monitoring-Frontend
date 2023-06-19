import landingImage from '../../images/mainpage_picture.jpg';
import ModalAuth from './ModalAuth';
import { useState } from 'react';

function HomeLanding() {
  const [modalActive, setModalActive] = useState(false);
  return (
    <main className="bg-[#FFFCF8] flex justify-around h-screen">
      <div className="main__leftside 2xl:px-14 2xl:py-4 px-20 py-6 basis-1/2 m-auto bg-amber-400">
        <div className="main__leftside-title 2xl:text-5xl text-6xl pb-10">
          Береги здоровье с нами!
        </div>
        <div className="main__leftside-text 2xl:text-3xl text-4xl pb-10">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum, esse obcaecati, hic a
          nemo assumenda sunt dolore perspiciatis quaerat odio vel ut omnis, ea explicabo fugiat
          illo cum ad reprehenderit.
        </div>
        <div className="main__leftside-btn">
          <a
            onClick={() => setModalActive(true)}
            className="inline-block text-3xl bg-white p-4 rounded-2xl">
            Начать
          </a>
        </div>
      </div>
      <div className="main__rightside px-20 basis-1/2 m-auto">
        <img className="rounded-2xl" src={landingImage} alt=""></img>
      </div>
      <ModalAuth active={modalActive} setActive={setModalActive} />
    </main>
  );
}

export default HomeLanding;
