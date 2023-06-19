import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatPartnerInfo, selectChatPartnerInfo } from '../redux/slices/chat';
import {
  fetchPatientBioData,
  fetchPatientPressureData,
  fetchPatientPulseData,
  fetchPatientSugarData,
  selectPatientBio,
  selectPatientPressure,
  selectPatientPulse,
  selectPatientSugar,
} from '../redux/slices/doctor';
import { useNavigate } from 'react-router-dom';
import { fetchAuthMe, selectUserData } from '../redux/slices/auth';

function ChatSideMenu(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChatPartnerInfo(props.partnerId));
    dispatch(fetchAuthMe());
  }, [dispatch, props.partnerId]);
  const partnerInfo = useSelector(selectChatPartnerInfo);
  const curUserInfo = useSelector(selectUserData);

  const onClickRequestPatientSugar = () => {
    const state = {
      category: 'sugar',
      patientUsername: partnerInfo.username,
      patientFirstName: partnerInfo.firstName,
      patientLastName: partnerInfo.lastName,
      patientId: partnerInfo?.id,
    };
    navigate('/patientMedicalData', { state });
  };

  const onClickRequestPatientPulse = () => {
    const state = {
      category: 'pulse',
      patientUsername: partnerInfo.username,
      patientFirstName: partnerInfo.firstName,
      patientLastName: partnerInfo.lastName,
      patientId: partnerInfo?.id,
    };
    navigate('/patientMedicalData', { state });
  };

  const onClickRequestPatientPressure = () => {
    const state = {
      category: 'pressure',
      patientUsername: partnerInfo.username,
      patientFirstName: partnerInfo.firstName,
      patientLastName: partnerInfo.lastName,
      patientId: partnerInfo?.id,
    };
    navigate('/patientMedicalData', { state });
  };

  const onClickRequestPatientBio = () => {
    const state = {
      category: 'bio',
      patientUsername: partnerInfo.username,
      patientFirstName: partnerInfo.firstName,
      patientLastName: partnerInfo.lastName,
      patientId: partnerInfo?.id,
    };
    navigate('/patientMedicalData', { state });
  };

  return (
    <div class="w-2/5 border-l-2 px-5">
      {Object.keys(partnerInfo).length !== 0 ? (
        <div class="flex flex-col">
          <div class="font-semibold text-xl self-center">
            {partnerInfo.firstName} {partnerInfo.lastName}
          </div>
          <div class="font-semibold text-xl">Никнейм: {partnerInfo.username}</div>
          <div class="font-semibold text-xl">
            Роль:{' '}
            {partnerInfo?.role === 'DefaultUser'
              ? 'Пользователь'
              : partnerInfo?.role === 'Doctor'
              ? 'Доктор'
              : partnerInfo?.role === 'Admin'
              ? 'Администратор'
              : 'Неизвестно'}
          </div>
          <img src={partnerInfo.profilePicture} class="object-cover rounded-xl h-64" alt=""></img>
          {curUserInfo.role === 'DefaultUser' ? (
            <div></div>
          ) : (
            <div class="font-light">
              <div class="docoptions__group flex flex-col gap-6">
                <div class="docoptions__group-title font-semibold pt-14 self-center text-2xl">
                  Получить данные про
                </div>
                <div class="docoptions__group-row flex justify-around gap-4">
                  <div
                    class="docoptions__group-row-item flex-1 border border-black rounded-xl p-2 bg-[#F8DEBD] text-center"
                    onClick={() => onClickRequestPatientSugar()}>
                    <a class="text-xl" href="/patientMedicalData">
                      Сахар
                    </a>
                  </div>
                  <div
                    class="docoptions__group-row-item flex-1 border border-black rounded-xl p-2 bg-[#FBF0F3] text-center"
                    onClick={() => onClickRequestPatientPulse()}>
                    <a class="text-xl" href="/patientMedicalData">
                      Пульс
                    </a>
                  </div>
                </div>
                <div class="docoptions__group-row flex justify-around gap-4">
                  <div
                    class="docoptions__group-row-item flex-1 border border-black rounded-xl p-2 bg-[#D0FBFF] text-center"
                    onClick={() => onClickRequestPatientPressure()}>
                    <a class="text-xl" href="/patientMedicalData">
                      Давление
                    </a>
                  </div>
                  <div
                    class="docoptions__group-row-item flex-1 border border-black rounded-xl p-2 bg-gray-200 text-center"
                    onClick={() => onClickRequestPatientBio()}>
                    <a class="text-xl" href="/patientMedicalData">
                      Биоданные
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ChatSideMenu;
