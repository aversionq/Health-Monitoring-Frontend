import AvailableDoctorsBody from './AvailableDoctorsBody';
import Sidebar from './profile-components/Sidebar';

function AvailableDoctors() {
  return (
    <main class="bg-[#FFFCF8] h-full flex justify-around">
      <Sidebar></Sidebar>
      <AvailableDoctorsBody></AvailableDoctorsBody>
    </main>
  );
}

export default AvailableDoctors;
