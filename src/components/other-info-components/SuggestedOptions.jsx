import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectUserData } from '../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';

function SuggestedOptions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);
  const userInfo = useSelector(selectUserData);
  const userRole = userInfo?.role;

  return (
    <div class="analysisinfo__analysischoice mt-8 p-6 bg-[#303030] text-white rounded-3xl">
      <div class="analysisinfo__analysischoice__title font-semibold pb-4 text-3xl 2xl:text-xl">
        Действия
      </div>
      <div class="analysisinfo__analysischoice__options flex justify-center">
        <div class="analysisinfo__analysischoice__options-buttons flex flex-col items-center">
          <div
            class="analysisinfo__analysischoice__options-buttons-moredata"
            onClick={() => navigate('/fulldata')}>
            <a
              href="/fulldata"
              class="block p-5 2xl:p-2 mb-5 bg-[#4A4949] rounded-2xl text-lg 2xl:text-base">
              Посмотреть все измерения
            </a>
          </div>
          <div
            class="analysisinfo__analysischoice__options-buttons-diabetes"
            onClick={() => navigate('/analysis')}>
            <a
              href="/analysis"
              class="block p-5 2xl:p-2 mb-5 bg-[#4A4949] rounded-2xl text-lg 2xl:text-base">
              Провериться на диабет
            </a>
          </div>
          {userRole === 'DefaultUser' ? (
            <div
              class="analysisinfo__analysischoice__options-buttons-diabetes"
              onClick={() => navigate('/doctorRoleRequest')}>
              <a
                href="/doctorRoleRequest"
                class="block p-5 mb-5 2xl:p-2 bg-[#4A4949] rounded-2xl text-lg 2xl:text-base">
                Получить роль доктора
              </a>
            </div>
          ) : (
            <div></div>
          )}
          <div
            class="analysisinfo__analysischoice__options-buttons-settings"
            onClick={() => navigate('/settings')}>
            <a
              href="/settings"
              class="block p-5 2xl:p-2 mb-5 bg-[#4A4949] rounded-2xl text-lg 2xl:text-base">
              Изменить параметры
            </a>
          </div>
          <div
            class="analysisinfo__analysischoice__options-buttons-chat"
            onClick={() => navigate('/chat')}>
            <a
              href="/chat"
              class="block p-5 2xl:p-2 bg-[#4A4949] rounded-2xl text-lg 2xl:text-base">
              {userRole === 'DefaultUser' ? 'Чат с докторами' : 'Отркыть чат'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestedOptions;
