import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUserId, selectCurrentUserId } from '../redux/slices/userdata';

function ChatMessageComponent(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUserId());
  }, [dispatch]);
  const currentUserId = useSelector(selectCurrentUserId);

  return (
    <div>
      {props.message.fromUser === currentUserId ? (
        <div class="flex justify-end mb-4">
          <div class="mr-2 py-3 px-4 bg-amber-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white flex flex-col">
            {props.message.messageText}
            <div className="self-end text-black">
              {new Date(props.message.sentAt).toLocaleTimeString().slice(0, 5)}
            </div>
          </div>
          <img
            src={props.curUserPfp}
            class="object-cover h-8 w-8 rounded-full self-end"
            alt=""></img>
        </div>
      ) : (
        <div class="flex justify-start mb-4">
          <img
            src={props.otherUserPfp}
            class="object-cover h-8 w-8 rounded-full self-end"
            alt=""></img>
          <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
            <div>{props.message.messageText}</div>
            <div class="text-black">
              {new Date(props.message.sentAt).toLocaleTimeString().slice(0, 5)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatMessageComponent;
