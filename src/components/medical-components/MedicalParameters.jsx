import MedicalEntity from './medical-parameters-components/MedicalEntity';
import bloodSugarImage from '../../images/blood_sugar_icon.png';
import heartRateImage from '../../images/heart_rate_icon.png';
import pressureImage from '../../images/blood_pressure_icon.png';
import BloodSugar from '../medical-components/medical-parameters-components/BloodSugar';
import Pressure from '../medical-components/medical-parameters-components/Pressure';
import HeartRate from '../medical-components/medical-parameters-components/HeartRate';
import medApi from '../api-med';
import { useEffect, useState } from 'react';
import { fetchLatestSugar } from '../../redux/slices/sugar';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserSugar } from '../../redux/slices/sugar';
import { fetchLatestPulse, selectUserPulse } from '../../redux/slices/heartrate';
import { fetchLatestPressure, selectUserPressure } from '../../redux/slices/pressure';

function MedicalParameters() {
  // const [latestSugar, setLatestSugar] = useState({});
  // const [latestPulse, setLatestPulse] = useState({});
  // const [latestPressure, setLatestPressure] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchLatestSugar());
      await dispatch(fetchLatestPulse());
      await dispatch(fetchLatestPressure());
    }
    fetchData();
  }, [dispatch]);

  const latestSugar = useSelector(selectUserSugar);
  const latestPulse = useSelector(selectUserPulse);
  const latestPressure = useSelector(selectUserPressure);

  return (
    <div class="maininfo__currdata flex flex-row justify-between pt-8 gap-14 sm:gap-2 mb-8">
      <BloodSugar
        title="Сахар в крови"
        entityColor="#F8DEBD"
        entityImage={bloodSugarImage}
        latestValue={latestSugar}
      />
      <HeartRate
        title="Пульс"
        entityColor="#FBF0F3"
        entityImage={heartRateImage}
        latestValue={latestPulse}
      />
      <Pressure
        title="Давление"
        entityColor="#D0FBFF"
        entityImage={pressureImage}
        latestValue={latestPressure}
      />
    </div>
  );
}

export default MedicalParameters;
