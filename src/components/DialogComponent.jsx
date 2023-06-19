function DialogComponent(props) {
  const handleClick = () => {
    props.updateSelectedChat(props.chatInfo.id, props.chatInfo.otherUserId);
  };

  return (
    <div
      class="flex flex-row py-4 px-2 justify-center items-center border-b-2"
      onClick={handleClick}>
      <div class="w-1/4">
        <img
          src={props.chatInfo.otherUserPicture}
          class="object-cover h-12 w-12 rounded-full"
          alt="Avatar"></img>
      </div>
      <div class="w-full">
        <div class="text-lg font-semibold">{props.chatInfo.otherUserUsername}</div>
        <div class="message-short flex justify-between">
          <div className="flex ">
            <div className="text-gray-500 mr-1">
              {props.chatInfo.fromUsername === props.chatInfo.otherUserUsername
                ? props.chatInfo.fromUsername + ':'
                : 'Вы:'}
            </div>
            <div class="text-gray-500">{props.chatInfo.lastMessageText.slice(0, 13)}</div>
          </div>
          <div class="text-gray-500">
            {new Date(props.chatInfo.lastMessageDate).toLocaleTimeString().slice(0, 5)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DialogComponent;
