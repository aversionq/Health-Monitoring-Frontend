import CurrentUserMessage from './CurrentUserMessage';
import OtherUserMessage from './OtherUserMessage';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchChatMessages,
  fetchChatPartnerInfo,
  selectChatMessages,
  selectChatPartnerInfo,
} from '../redux/slices/chat';
import { useEffect, useState } from 'react';
import ChatMessageComponent from './ChatMessageComponent';
import { fetchAuthMe, selectUserData } from '../redux/slices/auth';

function ChatWindow(props) {
  const [messages, setMessages] = useState();
  const [newMessageText, setNewMessageText] = useState();

  useEffect(() => {
    props.hub.on('ReceiveMessage', (data) => {
      const msgDate = new Date(data?.sentAt);
      const offset = msgDate.getTimezoneOffset();
      msgDate.setHours(msgDate.getHours() + offset / 60);
      data.sentAt = msgDate.toISOString();
      setMessages((messages) => [data, ...messages]);
    });
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChatMessages(props.selectedChat));
    dispatch(fetchAuthMe());
    dispatch(fetchChatPartnerInfo(props?.partnerId));
  }, [dispatch, props.selectedChat]);
  const curUser = useSelector(selectUserData);
  const otherUser = useSelector(selectChatPartnerInfo);
  const chatMessagesReq = useSelector(selectChatMessages);

  useEffect(() => {
    if (chatMessagesReq) {
      const reversedMessages = [...chatMessagesReq].reverse();
      setMessages(reversedMessages);
    }
  }, [chatMessagesReq]);

  const handleEnterPress = async (e) => {
    if (e.keyCode === 13) {
      await sendMessage(newMessageText);
    }
  };

  const sendMessage = async () => {
    const curDate = new Date();
    const offset = curDate.getTimezoneOffset();
    curDate.setHours(curDate.getHours() - offset / 60);
    try {
      const msgData = {
        chatId: props?.selectedChat,
        fromUser: curUser?.id,
        toUser: props.partnerId,
        messageText: newMessageText,
        sentAt: curDate.toISOString(),
      };

      await props.hub.invoke('SendMessage', msgData);

      setNewMessageText('');
    } catch (error) {
      console.log(error);
    }
  };

  const chatMessages = messages?.map((data) => {
    return (
      <ChatMessageComponent
        message={data}
        curUserPfp={curUser.profilePicture}
        otherUserPfp={otherUser.profilePicture}></ChatMessageComponent>
    );
  });

  return (
    <div class="w-full px-5 flex flex-col justify-between">
      <div class="flex flex-col-reverse mt-5 h-bigchat 2xl:h-chat overflow-y-auto">
        {chatMessages}
      </div>
      <div class="mt-2 py-6 flex items-center gap-4">
        <input
          class="w-full bg-gray-300 py-5 px-3 rounded-xl"
          type="text"
          placeholder="Написать сообщение..."
          onChange={(e) => setNewMessageText(e.target.value)}
          value={newMessageText}
          onKeyDown={handleEnterPress}></input>
        <div className="bg-amber-400 p-2 rounded-xl" onClick={() => sendMessage()}>
          <img
            src="https://cdn.icon-icons.com/icons2/2941/PNG/512/send_message_icon_183780.png"
            className="w-12"></img>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
