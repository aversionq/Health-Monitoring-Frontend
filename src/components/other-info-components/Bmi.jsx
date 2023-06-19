import progressBmi from '../../images/bmi_progressbar.png';
import userApi from '../user-api';
import { useEffect } from 'react';
import { fetchAuthMe } from '../../redux/slices/auth';
import { selectUserData } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBmi, selectUserBmi } from '../../redux/slices/userbmi';

function Bmi() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);
  const userData = useSelector(selectUserData);

  useEffect(() => {
    dispatch(fetchUserBmi(userData?.id));
  }, [userData]);
  const userBmi = useSelector(selectUserBmi);

  return (
    <div class="analysisinfo__bmicalc bg-[#303030] rounded-3xl text-white p-10 2xl:p-6">
      <div class="analysisinfo__bmicalc__title pb-14 text-3xl 2xl:pb-8 2xl:text-xl">
        Калькулятор ИМТ
      </div>
      <div class="analysisinfo__bmicalc__info flex items-stretch justify-around">
        <div class="analysisinfo__bmicalc__info__inputdata auto-cols-fr grid-flow-row grid pr-6 gap-4">
          <div class="analysisinfo__bmicalc__info__inputdata-height flex justify-between items-center">
            <div class="analysisinfo__bmicalc__info__inputdata-height-title text-xl 2xl:text-base p-6 2xl:p-4 bg-[#F8DEBD] rounded-xl text-black">
              Рост: {userBmi?.userHeight} см
            </div>
          </div>
          <div class="analysisinfo__bmicalc__info__inputdata-weight flex justify-between items-center">
            <div class="analysisinfo__bmicalc__info__inputdata-weight-title text-xl 2xl:text-base p-6 2xl:p-4 bg-[#D0FBFF] rounded-xl text-black ">
              Вес: {userBmi?.userWeight} кг
            </div>
          </div>
        </div>
        <div class="analysisinfo__bmicalc__info__resdata ml-8 p-10 2xl:p-6 pt-2 bg-[#4A4949] rounded-xl">
          <div class="analysisinfo__bmicalc__info__resdata-title text-xl 2xl:text-base">
            Индекс массы тела (ИМТ)
          </div>
          <div class="analysisinfo__bmicalc__info__resdata-val flex justify-between pt-8 2xl:pt-4 items-center sm:gap-1">
            <div class="analysisinfo__bmicalc__info__resdata-val-number  text-3xl 2xl:text-2xl">
              {Math.round(userBmi.bmi * 10) / 10}
            </div>
            <div class="analysisinfo__bmicalc__info__resdata-val-state bg-[#D6FFDD] text-black text-xl 2xl:text-base p-4 2xl:p-2 rounded-xl">
              {userBmi?.bmiState === 'Underweight'
                ? 'Недовес'
                : userBmi?.bmiState === 'Normal'
                ? 'Нормальный'
                : userBmi?.bmiState === 'Overweight'
                ? 'Повышенный'
                : userBmi?.bmiState === 'Obese'
                ? 'Ожирение'
                : 'Неизвестно'}
            </div>
          </div>
          <div class="analysisinfo__bmicalc__info__resdata-progressbar pt-8 2xl:pt-6">
            <img class="h-4 w-52 2xl:h-3 2xl:w-48" src={progressBmi} alt="BMI progress bar"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bmi;
