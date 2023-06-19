import './modal.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchAuthMe, selectIsAuth } from '../../redux/slices/auth';
import { fetchAuth, fetchRegister } from '../../redux/slices/auth';

function ModalAuth(props) {
  const [isRegister, setIsRegister] = useState(false);
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  const onRegisterSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('jwt', data.payload.token);
      dispatch(fetchAuthMe());
    }
  };

  const onLoginSubmit = async (values) => {
    delete values.email;
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('jwt', data.payload.token);
      dispatch(fetchAuthMe());
    }
  };

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  const updateInputs = (registerFlag) => {
    setIsRegister(registerFlag);
    setUsernameValue('');
    setEmailValue('');
    setPasswordValue('');
  };

  const handleUsernameInputChange = (event) => {
    setUsernameValue(event.target.value);
  };
  const handlePasswordInputChange = (event) => {
    setPasswordValue(event.target.value);
  };
  const handleEmailInputChange = (event) => {
    setEmailValue(event.target.value);
  };

  return (
    <div
      className={props.active ? 'modal active' : 'modal'}
      onClick={() => props.setActive(!props.active)}>
      <main className="modal__content" onClick={(e) => e.stopPropagation()}>
        <form
          className="flex flex-col"
          onSubmit={isRegister ? handleSubmit(onRegisterSubmit) : handleSubmit(onLoginSubmit)}>
          <p className={isRegister ? 'active text-lg' : 'modal__register text-lg'}>
            Электронная почта:
          </p>
          <input
            className={
              isRegister ? 'active border-black border' : 'modal__register border-black border'
            }
            type="email"
            {...register('email')}
            value={emailValue}
            onChange={handleEmailInputChange}
          />
          <p className="text-lg">Никнейм:</p>
          <input
            className="border-black border"
            type="text"
            {...register('username')}
            required
            value={usernameValue}
            onChange={handleUsernameInputChange}></input>
          <p className="text-lg">Пароль:</p>
          <input
            className="border-black border"
            type="password"
            {...register('password')}
            required
            value={passwordValue}
            onChange={handlePasswordInputChange}></input>
          <button
            className="text-2xl mt-4 border border-black rounded-2xl text-center"
            type="submit">
            Отправить
          </button>
        </form>
        <div className="flex flex-col">
          <button
            onClick={() => updateInputs(!isRegister)}
            className="inline-block self-center text-xl pt-6">
            {isRegister ? 'Или войти' : 'Или зарегистрироваться'}
          </button>
        </div>
      </main>
    </div>
  );
}

export default ModalAuth;
