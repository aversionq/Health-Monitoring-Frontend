import DoctorRequestBody from './DoctorRequestBody';
import Sidebar from './profile-components/Sidebar';

function DoctorRequest() {
  return (
    <main class="bg-[#FFFCF8] h-screen flex justify-around">
      <Sidebar></Sidebar>
      <DoctorRequestBody></DoctorRequestBody>
    </main>
  );
}

export default DoctorRequest;
