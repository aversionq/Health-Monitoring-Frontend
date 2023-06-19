import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUserId, selectCurrentUserId } from '../redux/slices/userdata';
import { useEffect } from 'react';
import userApi from './user-api';

function DoctorRequestBody() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUserId());
  }, [dispatch]);
  const currentUserId = useSelector(selectCurrentUserId);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      UserId: currentUserId,
      PassportImage: '',
      DiplomaImage: '',
    },
  });

  const onRequestDoctorRole = async (values) => {
    const formData = new FormData();
    formData.append('UserId', currentUserId);
    formData.append('PassportImage.files', values.PassportImage[0]);
    formData.append('DiplomaImage.files', values.DiplomaImage[0]);
    const response = await userApi.post('Doctor/requestDoctorRole', formData);
    if (response.status === 200 || response.status === 204) {
      alert('Заявление отправлено! Ожидайте ответа.');
    }
    reset();
  };

  return (
    <div class="docreq flex sm:basis-full flex-1 flex-col pt-16 pl-14 2xl:pt-10 2xl:pl-8">
      <div class="docreq-title self-center text-4xl font-bold p-8 pb-24">
        Запрос на получение роли "Доктор"
      </div>
      <div class="docreq__form">
        <form class="flex flex-col" onSubmit={handleSubmit(onRequestDoctorRole)}>
          <div class="docreq__form-inputs flex justify-evenly">
            <div class="docreq__form-passport">
              <div class="docreq__form-passport-title text-2xl font-semibold pb-4">
                Фото пасспорта
              </div>
              <input type="file" accept=".png, .jpg, .jpeg" {...register('PassportImage')}></input>
            </div>
            <div class="docreq__form-diploma">
              <div class="docreq__form-diploma-title text-2xl font-semibold pb-4">Фото диплома</div>
              <input type="file" accept=".png, .jpg, .jpeg" {...register('DiplomaImage')}></input>
            </div>
          </div>
          <div class="docreq__form-btn self-center pt-10 pb-10">
            <input
              type="submit"
              value="Отправить"
              class="border-black border rounded-xl p-4 text-3xl font-bold"></input>
          </div>
        </form>
      </div>
      <div class="docreq__why flex flex-col mx-52 p-4 shadow-xl bg-white rounded-xl">
        <div class="docreq__why-title text-3xl font-bold self-center pb-6">Почему это важно?</div>
        <div class="docreq__why-info text-xl text-center">
          Подтверждение личности и квалификации врача является важным процессом для обеспечения
          безопасности пациентов и качества медицинской помощи. Это позволяет убедиться, что врач
          имеет необходимые знания, навыки и опыт для консультации пациентов. Также подтверждение
          личности врача используется для предотвращения мошенничества и недобросовестной практики в
          медицинской сфере.
        </div>
      </div>
    </div>
  );
}

export default DoctorRequestBody;
