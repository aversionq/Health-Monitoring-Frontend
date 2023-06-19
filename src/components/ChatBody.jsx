import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserChats, selectUserChats } from '../redux/slices/chat';
import ChatHeader from './ChatHeader';
import ChatSideMenu from './ChatSideMenu';
import ChatWindow from './ChatWindow';
import DialogComponent from './DialogComponent';

function ChatBody(props) {
  const [selectedChat, setSelectedChat] = useState();
  const [chatPartner, setChatPartner] = useState();
  const dispatch = useDispatch();

  const updateSelectedChat = (newChat, newPartner) => {
    setSelectedChat(newChat);
    setChatPartner(newPartner);
  };

  useEffect(() => {
    dispatch(fetchUserChats());
  }, [dispatch]);
  const userChatsInfo = useSelector(selectUserChats);

  const userChatsPreview = userChatsInfo.map((data) => {
    return (
      <DialogComponent chatInfo={data} updateSelectedChat={updateSelectedChat}></DialogComponent>
    );
  });

  return (
    <div class="chatpage flex sm:basis-full flex-1 flex-col">
      <ChatHeader></ChatHeader>
      <div class="flex flex-row justify-between bg-white">
        <div class="flex flex-col w-2/5 border-r-2 overflow-y-scroll h-bigdialogs 2xl:h-dialogs">
          <div class="border-b-2 py-4 px-2">
            <input
              type="text"
              placeholder="search chatting"
              class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"></input>
          </div>
          {userChatsPreview}
        </div>
        <ChatWindow
          selectedChat={selectedChat}
          partnerId={chatPartner}
          hub={props.signalrHub}></ChatWindow>
        <ChatSideMenu selectedChat={selectedChat} partnerId={chatPartner}></ChatSideMenu>
      </div>
    </div>
  );
}

export default ChatBody;
