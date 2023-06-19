import Sidebar from './profile-components/Sidebar';
import MedicalInfo from './profile-components/MedicalInfo';
import OtherInfo from './profile-components/OtherInfo';

function ProfilePage() {
  return (
    <main class="bg-[#FFFCF8] flex-row sm:flex-col flex rounded-3xl pb-4">
      <Sidebar />
      <MedicalInfo />
      <OtherInfo />
    </main>
  );
}

export default ProfilePage;
