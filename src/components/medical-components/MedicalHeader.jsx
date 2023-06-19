import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectUserData } from '../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';

function MedicalHeader() {
  const navigate = useNavigate();
  const dispatch = new useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  const userInfo = useSelector(selectUserData);

  useEffect(() => {
    const hasNullProperty = Object.values(userInfo).includes(null);
    if (hasNullProperty) {
      alert('Заполните данные в настройках, пожалуйста');
      navigate('/settings');
    }
  });

  return (
    <div class="maininfo__header flex justify-between items-center">
      <div class="maininfo__header__title">
        <div class="maininfo__header__title-text font-bold text-6xl 2xl:text-3xl">
          Обзор здоровья {userInfo?.username}
        </div>
        <div class="maininfo__header__title-date text-2xl 2xl:text-base">
          {userInfo?.firstName} {userInfo?.lastName} | Роль -{' '}
          {userInfo?.role === 'DefaultUser'
            ? 'Пользователь'
            : userInfo?.role === 'Doctor'
            ? 'Доктор'
            : userInfo?.role === 'Admin'
            ? 'Администратор'
            : 'Неизвестно'}
        </div>
      </div>
      <div class="maininfo__header__something" onClick={() => navigate('/fulldata')}>
        <a
          href="/fulldata"
          class="block bg-amber-400 p-4 2xl:p-2 rounded-xl font-semibold text-2xl 2xl:text-base">
          Добавить измерение
        </a>
      </div>
    </div>
  );
}

export default MedicalHeader;
