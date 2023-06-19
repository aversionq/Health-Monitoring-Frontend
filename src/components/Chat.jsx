import ChatBody from './ChatBody';
import Sidebar from './profile-components/Sidebar';
import * as signalR from '@microsoft/signalr';

function Chat() {
  const _token = localStorage.getItem('jwt');
  const connection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:8080/chat', {
      skipNegotiation: true,
      accessTokenFactory: () => _token,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .build();

  connection.start();
  return (
    <main class="bg-[#FFFCF8] h-screen flex justify-around">
      <Sidebar></Sidebar>
      <ChatBody signalrHub={connection}></ChatBody>
    </main>
  );
}

export default Chat;
