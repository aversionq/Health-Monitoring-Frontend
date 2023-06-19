import AddEntityComponent from './fulldata-components/AddEntityComponent';
import DataTableComponent from './fulldata-components/DataTableComponent';
import Sidebar from './profile-components/Sidebar';

function FullDataPage() {
  return (
    <main class="bg-[#FFFCF8] h-full flex justify-around">
      <Sidebar />

      <div class="maininfo flex sm:basis-full flex-1 flex-col pt-16 pl-14 2xl:pt-10 2xl:pl-8">
        <AddEntityComponent />
        <DataTableComponent />
      </div>
    </main>
  );
}

export default FullDataPage;
