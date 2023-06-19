import PatientMedDataBody from './PatientMedDataBody';
import Sidebar from './profile-components/Sidebar';

function PatientMedData() {
  return (
    <main class="bg-[#FFFCF8] h-screen flex justify-around">
      <Sidebar></Sidebar>
      <PatientMedDataBody></PatientMedDataBody>
    </main>
  );
}

export default PatientMedData;
