import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchChangeUserWeight,
  fetchChangeUserHeight,
  fetchChangeUserUsername,
  fetchChangeUserFirstName,
  fetchChangeUserLastName,
  fetchChangeUserBirthday,
  fetchChangeUserGender,
} from '../redux/slices/userdata';
import { selectUserData, fetchAuthMe } from '../redux/slices/auth';
import { useEffect } from 'react';
import userApi from './user-api';

function SettingsBody() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);
  const userData = useSelector(selectUserData);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: userData,
  });

  const onChangeSubmit = async (values) => {
    if (values.height !== '') {
      const data = {
        value: values.height,
      };
      dispatch(fetchChangeUserHeight(data));
    }
    if (values.weight !== '') {
      const data = {
        value: values.weight,
      };
      dispatch(fetchChangeUserWeight(data));
    }
    if (values.firstName !== '') {
      const data = {
        value: values.firstName,
      };
      dispatch(fetchChangeUserFirstName(data));
    }
    if (values.lastName !== '') {
      const data = {
        value: values.lastName,
      };
      dispatch(fetchChangeUserLastName(data));
    }
    if (values.dateOfBirth !== '') {
      const data = {
        value: values.dateOfBirth,
      };
      dispatch(fetchChangeUserBirthday(data));
    }
    if (values.username !== '') {
      const data = {
        value: values.username,
      };
      dispatch(fetchChangeUserUsername(data));
    }
    if (values.gender !== '') {
      const data = {
        value: values.gender,
      };
      dispatch(fetchChangeUserGender(data));
    }
    if (values.profilePicture !== '') {
      const formData = new FormData();
      formData.append('files', values.profilePicture[0]);
      const response = await userApi.patch('User/changeUserProfilePicture', formData);
    }
    dispatch(fetchAuthMe());
  };

  return (
    <div class="stngs flex sm:basis-full flex-1 flex-col pt-16 pl-14 2xl:pt-10 2xl:pl-8">
      <div class="stngs-title self-center text-3xl font-bold p-8 pb-24">
        Информация о пользователе
      </div>
      <form class="flex flex-col" onSubmit={handleSubmit(onChangeSubmit)}>
        <div class="stngs__inputs flex justify-around">
          <div class="stngs__inputs-personal">
            <div class="stngs__inputs-personal-title text-2xl font-semibold pb-20 text-center">
              Персональные данные
            </div>
            <div class="stngs__inputs-personal-forms flex flex-col">
              <div class="stngs__inputs-personal-forms-name text-right pb-20">
                <label class="float-left text-xl" for="">
                  Имя:
                </label>
                <input
                  class="inline-block border border-black ml-2"
                  type="text"
                  {...register('firstName')}
                  defaultValue={userData.firstName}></input>
              </div>
              <div class="stngs__inputs-personal-forms-surname text-right pb-20">
                <label class="float-left text-xl" for="">
                  Фамилия:
                </label>
                <input
                  class="inline-block border border-black ml-2"
                  type="text"
                  {...register('lastName')}
                  defaultValue={userData.lastName}></input>
              </div>
              <div class="stngs__inputs-personal-forms-surname text-right">
                <label class="float-left text-xl" for="">
                  Дата рождения:
                </label>
                <input
                  class="inline-block border border-black ml-2 w-48"
                  type="date"
                  {...register('dateOfBirth')}
                  defaultValue={userData?.dateOfBirth?.split('T')[0]}></input>
              </div>
            </div>
          </div>
          <div class="stngs__inputs-metrics">
            <div class="stngs__inputs-metrics-title text-2xl font-semibold pb-20 text-center">
              Биологические показатели
            </div>
            <div class="stngs__inputs-personal-forms flex flex-col">
              <div class="stngs__inputs-personal-forms-name text-right pb-20">
                <label class="float-left text-xl" for="">
                  Вес:
                </label>
                <input
                  class="inline-block border border-black ml-2"
                  type="number"
                  step={0.1}
                  {...register('weight')}
                  defaultValue={userData.weight}></input>
              </div>
              <div class="stngs__inputs-personal-forms-surname text-right pb-20">
                <label class="float-left text-xl" for="">
                  Рост:
                </label>
                <input
                  class="inline-block border border-black ml-2"
                  type="number"
                  step={0.1}
                  defaultValue={userData.height}
                  {...register('height')}></input>
              </div>
              <div class="stngs__inputs-personal-forms-surname text-right pb-14">
                <label class="float-left text-xl" for="">
                  Гендер:
                </label>
                <select class="inline-block border border-black ml-2 w-48" {...register('gender')}>
                  <option value={'Male'} selected={'Male' === userData.gender ? 'true' : 'false'}>
                    Мужчина
                  </option>
                  <option
                    value={'Female'}
                    selected={'Female' === userData.gender ? 'true' : 'false'}>
                    Женщина
                  </option>
                  <option value={'Other'} selected={'Other' === userData.gender ? 'true' : 'false'}>
                    Другое
                  </option>
                </select>
              </div>
              <div class="stngs__inputs-btn self-center">
                <button
                  class="inline-block border border-black py-4 px-10 rounded-xl text-xl font-semibold"
                  type="submit">
                  Сохранить
                </button>
              </div>
            </div>
          </div>
          <div class="stngs__inputs-account">
            <div class="stngs__inputs-account-title text-2xl font-semibold pb-20 text-center">
              Данные об аккаунте
            </div>
            <div class="stngs__inputs-personal-forms flex flex-col">
              <div class="stngs__inputs-personal-forms-name text-right pb-10">
                <label class="float-left text-xl" for="">
                  Никнейм:
                </label>
                <input
                  class="inline-block border border-black ml-2"
                  type="text"
                  defaultValue={userData.username}
                  {...register('username')}></input>
              </div>
              <div class="stngs__inputs-personal-forms-name pb-20 flex flex-col self-center">
                <label class="text-xl" for="">
                  Фото профиля:
                </label>
                <img className="w-40 pb-2" src={userData.profilePicture}></img>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  {...register('profilePicture')}></input>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SettingsBody;
