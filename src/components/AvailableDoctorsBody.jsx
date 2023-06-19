import DoctorComponent from './DoctorComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDoctors, selectAllDoctors } from '../redux/slices/doctor';
import { fetchCurrentUserId, selectCurrentUserId } from '../redux/slices/userdata';
import { useEffect } from 'react';

function AvailableDoctorsBody() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllDoctors());
    dispatch(fetchCurrentUserId());
  }, [dispatch]);
  const doctors = useSelector(selectAllDoctors);
  const userId = useSelector(selectCurrentUserId);

  const doctorsList = doctors.map((data) => {
    return <DoctorComponent doctorInfo={data} currentUserId={userId}></DoctorComponent>;
  });

  return (
    <div class="doclist flex sm:basis-full flex-1 flex-col pt-16 pl-14 2xl:pt-10 2xl:pl-8">
      <div class="doclist__title self-center text-3xl font-bold pb-4">Доступные доктора</div>
      <div class="doclist__warning self-center 2xl:text-lg text-xl font-semibold pb-20 text-center">
        Нажимая на кнопку "Начать переписку", вы разрешаете данному доктору посмотреть ваши
        медицинские параметры. Это сделано в целях более быстрой помощи.
      </div>
      <div class="doclist__main flex flex-col">
        <div class="doclist__main__row flex justify-center flex-wrap 2xl:gap-y-20 2xl:gap-x-12 gap-y-32 gap-x-52 pb-10">
          {doctorsList}
        </div>
      </div>
    </div>
  );
}

export default AvailableDoctorsBody;
