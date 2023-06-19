import Sidebar from './profile-components/Sidebar';
import AnalysisBody from './AnalysisBody';

function Analysis() {
  return (
    <main class="bg-[#FFFCF8] h-screen flex justify-around">
      <Sidebar></Sidebar>
      <AnalysisBody></AnalysisBody>
    </main>
  );
}

export default Analysis;
