import userApi from './user-api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchChatIdByUsers, selectChatIdByUsers } from '../redux/slices/chat';

function DoctorComponent(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onStartChat = async () => {
    const curDate = new Date();
    const offset = curDate.getTimezoneOffset();
    curDate.setHours(curDate.getHours() - offset / 60);

    const chatReqData = {
      lastMessageText:
        'Здравствуйте, я хотел(а) бы поговорить с вами о своём здоровье. У меня есть некоторые вопросы и проблемы, которые я хотел(а) бы обсудить.',
      lastMessageDate: curDate.toISOString(),
      fromUser: props.currentUserId,
      toUser: props.doctorInfo.id,
    };

    const becomePatientReq = await userApi.post(
      `User/becomeDoctorsPatient?doctorId=${props.doctorInfo.id}`,
    );

    const addNewChat = await userApi.post('Chat/addChat', chatReqData);

    alert(`Вы начали чат с ${props.doctorInfo.username}`);

    navigate('/chat');
  };

  const onOpenChat = async () => {
    const response = await userApi.get(
      `Chat/getChatByUserIds?userId=${props.currentUserId}&doctorId=${props.doctorInfo.id}`,
    );

    navigate('/chat');
  };

  return (
    <div class="doclist__main__row__item flex flex-col p-4 rounded-2xl shadow-2xl bg-white">
      <div class="doclist__main__row__content flex items-center gap-4 pb-6">
        <div class="doclist__main__row__item-photo">
          <img
            src={props.doctorInfo.profilePicture}
            alt="Фото доктора"
            class="object-cover w-40 h-40 rounded-full"></img>
        </div>
        <div class="doclist__main__row__item-info">
          <div class="doclist__main__row__item-info-fullname text-2xl">
            {props.doctorInfo.firstName} {props.doctorInfo.lastName}
          </div>
          <div class="doclist__main__row__item-info-username text-lg">
            Никнейм: {props.doctorInfo.username}
          </div>
          <div class="doclist__main__row__item-info-age text-lg">
            Возраст: {props.doctorInfo.age}
          </div>
          <div class="doclist__main__row__item-info-gender text-lg">
            Пол:{' '}
            {props.doctorInfo.gender === 'Male'
              ? 'Мужской'
              : props.doctorInfo.gender === 'Female'
              ? 'Женский'
              : 'Другое'}
          </div>
        </div>
      </div>
      {props.currentUserId !== props.doctorInfo.id ? (
        !props.doctorInfo.isContactedWithCurrentUser ? (
          <div class="doclist__main__row__item-btn self-center" onClick={() => onStartChat()}>
            <input
              type="button"
              value="Начать переписку"
              class="inline-block text-xl border border-black p-2 rounded-2xl bg-amber-300 mt-7"></input>
          </div>
        ) : (
          <div
            class="doclist__main__row__item-btn self-center flex flex-col justify-center"
            onClick={() => onOpenChat()}>
            <div className="text-base pb-2">(вы уже переписывались)</div>
            <input
              type="button"
              value="Перейти к чату"
              class="text-xl border border-black p-2 rounded-2xl bg-amber-300"></input>
          </div>
        )
      ) : (
        <div className="text-xl border border-black p-2 rounded-2xl bg-green-400 self-center mt-7">
          Это вы :)
        </div>
      )}
    </div>
  );
}

export default DoctorComponent;
