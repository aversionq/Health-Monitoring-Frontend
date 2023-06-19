import Sidebar from './profile-components/Sidebar';
import SettingsBody from './SettingsBody';

function Settings() {
  return (
    <main class="bg-[#FFFCF8] h-screen flex justify-around">
      <Sidebar></Sidebar>
      <SettingsBody></SettingsBody>
    </main>
  );
}

export default Settings;
