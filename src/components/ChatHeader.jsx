import { useNavigate } from 'react-router-dom';

function ChatHeader() {
  const navigate = useNavigate();

  return (
    <div class="px-5 py-5 flex justify-between items-center bg-white border-b-2">
      <div class="font-bold text-2xl">HealthedChat</div>
      <div class="flex basis-full justify-center" onClick={() => navigate('/availableDoctors')}>
        <div class="w-1/6">
          <a
            href="/availableDoctors"
            class="inline-block rounded-2xl bg-amber-200 py-3 px-5 w-full text-lg font-semibold text-center">
            Выбрать врача
          </a>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
