import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

function PatientMedDataBody(props) {
  const dispatch = useDispatch();
  const location = useLocation();

  const receivedData = location?.state;

  useEffect(() => {
    if (receivedData?.category === 'sugar') {
      dispatch(fetchPatientSugarData(receivedData?.patientId));
    } else if (receivedData?.category === 'pulse') {
      dispatch(fetchPatientPulseData(receivedData?.patientId));
    } else if (receivedData?.category === 'pressure') {
      dispatch(fetchPatientPressureData(receivedData?.patientId));
    } else {
      dispatch(fetchPatientBioData(receivedData?.patientId));
    }
  }, [dispatch]);

  const userData = useSelector(
    receivedData?.category === 'sugar'
      ? selectPatientSugar
      : receivedData?.category === 'pulse'
      ? selectPatientPulse
      : receivedData?.category === 'pressure'
      ? selectPatientPressure
      : selectPatientBio,
  );

  const tableRows =
    receivedData?.category === 'sugar'
      ? userData.map((data) => {
          return (
            <tr>
              <td>{data.sugarValue}</td>
              <td>{new Date(data.date)?.toLocaleString()}</td>
            </tr>
          );
        })
      : receivedData?.category === 'pulse'
      ? userData.map((data) => {
          return (
            <tr>
              <td>{data.pulse}</td>
              <td>{new Date(data.date)?.toLocaleString()}</td>
            </tr>
          );
        })
      : receivedData?.category === 'pressure'
      ? userData.map((data) => {
          return (
            <tr>
              <td>{data.systolic}</td>
              <td>{data.diastolic}</td>
              <td>{new Date(data.date)?.toLocaleString()}</td>
            </tr>
          );
        })
      : () => {
          return <div></div>;
        };

  return (
    <div class="stngs flex sm:basis-full flex-1 flex-col pt-16 pl-14 2xl:pt-10 2xl:pl-8">
      <div class="stngs-title self-center text-3xl font-bold p-8 pb-24">
        Данные о{' '}
        {receivedData?.category === 'sugar'
          ? 'сахаре в крови '
          : receivedData?.category === 'pulse'
          ? 'пульсе '
          : receivedData?.category === 'pressure'
          ? 'давлении '
          : 'биологических показателях '}
        пользователя {receivedData?.patientUsername} ({receivedData?.patientFirstName}{' '}
        {receivedData?.patientLastName})
      </div>
      <div class="maininfo__fulldata__data-table self-center p-4 mb-2">
        {receivedData?.category === 'bio' ? (
          <div>
            {' '}
            <div>Вес: {userData?.userWeight}</div>
            <div>Рост: {userData?.userHeight}</div>
            <div>ИКТ: {userData?.bmi}</div>
            <div>Статус ИКТ: {userData?.bmiState}</div>
            <div>Возраст: {userData?.age}</div>
            <div>Гендер: {userData?.gender}</div>
          </div>
        ) : (
          <table class="border-separate border border-slate-500 border-spacing-2">
            <thead>
              {receivedData?.category === 'sugar' ? (
                <tr>
                  <th class="border border-slate-600">Сахар в крови</th>
                  <th class="border border-slate-600">Дата</th>
                </tr>
              ) : receivedData?.category === 'pulse' ? (
                <tr>
                  <th class="border border-slate-600">Пульс</th>
                  <th class="border border-slate-600">Дата</th>
                </tr>
              ) : (
                <tr>
                  <th class="border border-slate-600">Верхнее</th>
                  <th class="border border-slate-600">Нижнее</th>
                  <th class="border border-slate-600">Дата</th>
                </tr>
              )}
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PatientMedDataBody;
